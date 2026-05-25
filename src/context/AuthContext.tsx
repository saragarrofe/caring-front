import { createContext, useContext, useEffect, useState } from 'react';
import { apiLogin, getProfile } from 'src/api/auth';

export type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem('auth:user');
      if (rawUser) {
        setUser(JSON.parse(rawUser));
      }

      const token = localStorage.getItem('auth:token');
      if (token) {
        setToken(token);
      }
    } catch {
      console.log('Error getting user from localStorage');
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const { token } = await apiLogin(email, password);
    const user = await getProfile(token);
    localStorage.setItem('auth:token', token);
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth:user');
    localStorage.removeItem('auth:token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
