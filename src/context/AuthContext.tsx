import { createContext, useContext, useEffect, useState } from 'react';
import { apiLogin, apiLogout, getMe } from 'src/api/auth';

export type User = {
  id: number;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const data = await apiLogin(email, password);
    setUser({ id: data.id, email: data.email });
  };

  const logout = async (): Promise<void> => {
    await apiLogout();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
