import { useState } from 'react';
import { api } from '~/shared/api';
import { useAuth } from '~/shared/hooks/useAuth';

interface UseLoginByEmailResult {
  login: (email: string, pincode: string) => Promise<boolean>;
  error: string;
  isLoading: boolean;
}

export const useLoginByEmail = (): UseLoginByEmailResult => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();

  const login = async (email: string, pincode: string): Promise<boolean> => {
    setError('');
    setIsLoading(true);

    try {
      const response = await api.loginEmail({
        email,
        pincode,
      });

      setAuth(response.data.session);

      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to login. Please try again.');
      }
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};
