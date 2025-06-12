import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '~/entities/AuthForm';
import { Routes } from '~/shared/constants';
import { useEnterByEmail } from '~/shared/hooks';
import { useAuthByCode } from '../hooks/useAuthByCode';
import { validateInput } from '../lib/validateInput';

export const AuthUser = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const {
    register,
    error: registerError,
    isLoading: isRegisterLoading,
  } = useEnterByEmail();

  const {
    login,
    error: loginError,
    isLoading: isLoginLoading,
  } = useAuthByCode();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInputError('');

    const inputType = validateInput(inputValue);

    if (!inputType) {
      setInputError('Enter valid email or 16-digit code');
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

  const isLoading = isRegisterLoading || isLoginLoading;
  return (
    <AuthForm
      inputValue={inputValue}
      setInputValue={setInputValue}
      error={inputError || registerError || loginError}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    />
  );
};
