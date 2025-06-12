import { useState } from 'react';
import { api } from '~/shared/api';
import { useAuth } from '~/shared/hooks/useAuth';

interface UseRegisterAnonymousResult {
  register: () => Promise<string | null>;
  error: string;
  isLoading: boolean;
}

export const useRegisterAnonymous = (): UseRegisterAnonymousResult => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();

  const register = async (): Promise<string | null> => {
    setError('');
    setIsLoading(true);

    try {
      const response = await api.registerCode();

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error.message);
      }

      const data = await response.json();
      return data.data.login_code;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to register. Please try again.');
      }
      console.error('Anonymous registration error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, error, isLoading };
};
