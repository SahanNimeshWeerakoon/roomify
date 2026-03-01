import { CheckCircle2, ImageIcon, UploadIcon } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router";
import {
    PROGRESS_INCREMENT,
    PROGRESS_INTERVAL_MS,
    REDIRECT_DELAY_MS,
} from "../lib/constants";

type UploadProps = {
    onComplete?: (base64: string) => void;
};

const MAX_UPLOAD_SIZE_BYTES = 50 * 1024 * 1024;
const ACCEPTED_TYPES = new Set(["image/jpeg", "image/png"]);

export default function Upload({ onComplete }: UploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(0);

    const intervalRef = useRef<number | null>(null);
    const redirectTimeoutRef = useRef<number | null>(null);

    const { isSignedIn } = useOutletContext<AuthContext>();

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if(redirectTimeoutRef.current) clearInterval(redirectTimeoutRef.current);
        };
    }, []);

    function handleDragEnter(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (!isSignedIn) return;
        setIsDragging(true);
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (!isSignedIn) return;
        setIsDragging(true);
    }

    function handleDragLeave(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (!isSignedIn) return;
        const files = Array.from(e.dataTransfer.files || []);
        if (files.length > 0) {
            onFileSelected(files[0]);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!isSignedIn) return;
        const f = e.target.files && e.target.files[0];
        if (f) onFileSelected(f);
        e.currentTarget.value = "";
    }

    function onFileSelected(f: File) {
        if (!ACCEPTED_TYPES.has(f.type)) return;
        if (f.size > MAX_UPLOAD_SIZE_BYTES) return;
        setFile(f);
        setProgress(0);
        processFile(f);
    }

    const processFile = useCallback((f: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;

            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            intervalRef.current = window.setInterval(() => {
                setProgress((prev) => {
                    const next = Math.min(100, prev + PROGRESS_INCREMENT);
                    if (next >= 100) {
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current);
                            intervalRef.current = null;
                        }
                        redirectTimeoutRef.current = window.setTimeout(() => {
                            onComplete && onComplete(result);
                        }, REDIRECT_DELAY_MS);
                    }
                    return next;
                });
            }, PROGRESS_INTERVAL_MS);
        };

        reader.readAsDataURL(f);
    }, [isSignedIn, onComplete])

    return (
        <div className="upload">
            {!file ? (
                <div
                    className={`dropzone ${isDragging ? "is-dragging" : ""}`}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        className="drop-input"
                        accept=".jpg,.jpeg,.png"
                        disabled={!isSignedIn}
                        onChange={handleChange}
                    />
                    <div className="drop-content">
                        <div className="drop-icon">
                            <UploadIcon size={20} />
                        </div>
                        <p>
                            {isSignedIn ? "Click to upload or just drag and drop" : "Sign in or sign up with Puter to upload"}
                        </p>
                        <p className="help">Maximum file size 50Mb</p>
                    </div>
                </div>
            ) : (
                <div className="upload-status">
                    <div className="status-content">
                        <div className="status-icon">
                            {progress === 100 ? (
                                <CheckCircle2 className="check" />
                            ) : (
                                <ImageIcon className="image" />
                            )}
                        </div>
                        <h3>{file?.name}</h3>
                        <div className="progress">
                            <div className="bar" style={{ width: `${progress}%` }}></div>
                            <p className="status-text">{progress < 100 ? "Analyzing Floor Plan..." : "Redirecting"}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}