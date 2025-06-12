import { useState } from 'react';
import { api } from '~/shared/api';
import { getBrowserLanguage } from '~/shared/utils';

interface useEnterByEmailResult {
  register: (email: string) => Promise<boolean>;
  error: string;
  isLoading: boolean;
}

export const useEnterByEmail = (): useEnterByEmailResult => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const register = async (email: string): Promise<boolean> => {
    setError('');
    setIsLoading(true);

    try {
      await api.registerEmail({
        email,
        lang: getBrowserLanguage(),
      });

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
