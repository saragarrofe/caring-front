import { createContext, useContext, useEffect, useState } from "react";


export type User = {
    id: string;
    name: string;
    email: string;
}

type AuthContextValue = {
    user: User | null;
    token: string | null,
    login: (user: User, token: string) => void;
    logout: () => void; 
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // mantener en sesión con useeffect y localStorage
    useEffect(() => {
        try {
            const rawUser = localStorage.getItem('auth:user');
            if (rawUser) { setUser(JSON.parse(rawUser)); }
    
            const token = localStorage.getItem('auth:token');
            if (token) { setToken(token); }
        } catch {
            console.log("Error getting user from localStorage"); 
        }
    }, []);


    const login = (user: User, token: string) => {
        if(user) { 
            setUser(user);
            localStorage.setItem('auth:user', JSON.stringify(user));
        }

        if (token) {
            setToken(token);
            localStorage.setItem('auth:token', token);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('auth:user');
        localStorage.removeItem('auth:token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
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
