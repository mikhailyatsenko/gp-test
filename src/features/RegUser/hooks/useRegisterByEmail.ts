import { useState } from 'react';
import { api } from '~/shared/api';
import { getBrowserLanguage } from '~/shared/utils';

interface UseRegisterByEmailResult {
  register: (email: string) => Promise<boolean>;
  error: string;
  isLoading: boolean;
}

export const useRegisterByEmail = (): UseRegisterByEmailResult => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const register = async (email: string): Promise<boolean> => {
    setError('');
    setIsLoading(true);

    try {
      const response = await api.registerEmail({
        email,
        lang: getBrowserLanguage(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error.message);
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to send code. Please try again.');
      }
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, error, isLoading };
};
