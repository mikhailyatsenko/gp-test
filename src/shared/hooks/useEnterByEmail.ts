import { useState } from 'react';
import { api } from '~/shared/api';
import { getBrowserLanguage } from '../utils';
import { REGISTRATION_ERROR } from './constants';

interface UseEnterByEmailResult {
  register: (email: string) => Promise<boolean>;
  error: string;
  isLoading: boolean;
  clearError: () => void;
}

export const useEnterByEmail = (): UseEnterByEmailResult => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const clearError = () => {
    setError('');
  };

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
        setError(REGISTRATION_ERROR);
      }
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, error, isLoading, clearError };
};
