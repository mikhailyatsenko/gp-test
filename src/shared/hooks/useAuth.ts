import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../lib';

interface UseAuthReturn {
  isAuthenticated: boolean;
  session: string | null;
  setAuth: (session: string) => void;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedSession = storage.getSession();
    if (savedSession) {
      setSession(savedSession);
      setIsAuthenticated(true);
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
    navigate('/auth');
  };

  return {
    isAuthenticated,
    session,
    setAuth,
    logout,
  };
}
