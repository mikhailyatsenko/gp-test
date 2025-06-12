import { useState } from 'react';
import { api } from '~/shared/api';
import { getBrowserLanguage } from '../utils';

interface UseEnterByEmailResult {
  register: (email: string) => Promise<boolean>;
  error: string;
  isLoading: boolean;
}

export const useEnterByEmail = (): UseEnterByEmailResult => {
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
      setError('Error by sending code. Try later.');
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, error, isLoading };
};
