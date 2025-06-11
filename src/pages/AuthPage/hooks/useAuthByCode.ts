import { useState } from 'react';
import { api } from '~/shared/api/api';
import { storage } from '~/shared/lib';

interface UseAuthByCodeResult {
  login: (code: string) => Promise<boolean>;
  error: string;
  isLoading: boolean;
}

export const useAuthByCode = (): UseAuthByCodeResult => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = async (code: string): Promise<boolean> => {
    setError('');
    setIsLoading(true);

    try {
      const response = await api.loginCode({
        code,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error.message);
      }

      const data = await response.json();
      storage.setSession(data.data.session);

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
