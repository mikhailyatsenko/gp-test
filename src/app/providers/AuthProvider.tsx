import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { AuthContext } from '~/shared/contexts';
import { storage } from '~/shared/lib';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [session, setSession] = useState<string | null>(null);

  useEffect(() => {
    const savedSession = storage.getSession();
    if (savedSession) {
      setSession(savedSession);
      setIsAuthenticated(true);
      setIsInitialized(true);
    }
  }, []);

  const setAuth = (newSession: string) => {
    storage.setSession(newSession);
    setSession(newSession);
    setIsAuthenticated(true);
  };

  const logout = () => {
    storage.clear();
    setSession(null);
    setIsAuthenticated(false);
    setIsInitialized(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        session,
        setAuth,
        logout,
        isInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
