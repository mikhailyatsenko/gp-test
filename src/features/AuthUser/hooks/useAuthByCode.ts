import { useState } from 'react';
import { api } from '~/shared/api';
import { useAuth } from '~/shared/hooks';
import { LOGIN_ERROR } from '../constants';

interface UseAuthByCodeResult {
  login: (code: string) => Promise<boolean>;
  error: string;
  isLoading: boolean;
  clearError: () => void;
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
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(LOGIN_ERROR);
      }
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError('');
  };

  return { login, error, isLoading, clearError };
};
