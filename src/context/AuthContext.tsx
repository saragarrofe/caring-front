import { createContext, useContext, useEffect, useState } from "react";


type User = {
    id: string;
    name: string;
    email: string;
}

type AuthContextValue = {
    user: User | null;
    login: (user: User, token: string) => void;
    logout: () => void; 
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);


export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    // mantener en sesión con useeffect y localStorage
    useEffect(() => {
        const rawUser = localStorage.getItem('auth:user');
        if (rawUser) {
            setUser(JSON.parse(rawUser));
        }
    }, []);


    const login = (user: User, token: string) => {
        setUser(user);
        localStorage.setItem('auth:user', JSON.stringify(user));
        if (token) {
            localStorage.setItem('auth:token', token);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('auth:user');
        localStorage.removeItem('auth:token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
