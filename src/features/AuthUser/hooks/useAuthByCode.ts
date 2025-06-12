import { useState } from 'react';
import { api } from '~/shared/api';
import { useAuth } from '~/shared/hooks';

interface UseAuthByCodeResult {
  login: (code: string) => Promise<boolean>;
  error: string;
  isLoading: boolean;
}

export const useAuthByCode = (): UseAuthByCodeResult => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();

  const login = async (code: string): Promise<boolean> => {
    setError('');
    setIsLoading(true);

    try {
      const response = await api.loginCode({
        code,
      });

      setAuth(response.data.session);

      return true;
    } catch (error) {
      setError('Invalid access code');
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};
