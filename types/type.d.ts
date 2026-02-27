type AuthState = {
    isSignedIn: boolean;
    userId: string | null;
    userName: string | null;
}

type AuthContext = {
    isSignedIn: boolean;
    userId: string | null;
    userName: string | null;
    signIn: () => Promise<boolean>;
    signOut: () => Promise<boolean>;
    refreshAuth: () => Promise<boolean>;
}