import { useState } from 'react';
import { api } from '~/shared/api/api';
import { getBrowserLanguage } from '../lib';

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
      setError('Error by sending code. Try later.');
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, error, isLoading };
};
