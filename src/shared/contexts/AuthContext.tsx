import { createContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isInitialized: boolean;
  session: string | null;
  setAuth: (session: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
