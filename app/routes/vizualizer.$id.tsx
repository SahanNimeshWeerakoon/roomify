import { useLocation } from 'react-router'

export default function VizualizerId() {
    const location = useLocation();
    const { name, initialImage } = location.state || {};
    if (!location.state) {
        return (
            <div className='flex items-center justify-center h-[80vh]'>
                <h1 className='text-8xl'>No no... not your place..</h1>
            </div>
        );
    }
    return (
        <section>
            <h1>{ name || 'Untitled Project' }</h1>
            <div className="visualizer">
                {initialImage && (
                    <div className="image-container">
                        <h2>Source Image</h2>
                        <img src={initialImage} alt='source' />
                    </div>
                )}
            </div>
        </section>
    )
}