import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '~/entities/AuthForm';
import { Routes } from '~/shared/constants';
import { useRegisterByEmail } from '~/shared/hooks';
import { useAuthByCode } from '../hooks/useAuthByCode';
import { validateInput } from '../lib/validateInput';

export const AuthUser = () => {
  const navigate = useNavigate();
  const {
    register,
    error: registerError,
    isLoading: isRegisterLoading,
  } = useRegisterByEmail();
  const {
    login,
    error: loginError,
    isLoading: isLoginLoading,
  } = useAuthByCode();

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const isLoading = isRegisterLoading || isLoginLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const inputType = validateInput(inputValue);

    if (!inputType) {
      setError('Enter valid email or 16-digit code');
      return;
    }

    if (inputType === 'email') {
      const success = await register(inputValue);
      if (success) {
        navigate(Routes.AuthEmail, { state: { email: inputValue } });
      }
    } else {
      const success = await login(inputValue);
      if (success) {
        navigate(Routes.Home);
      }
    }
  };

  return (
    <AuthForm
      inputValue={inputValue}
      setInputValue={setInputValue}
      error={error || registerError || loginError}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    />
  );
};
