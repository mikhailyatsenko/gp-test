import type React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '~/entities/AuthForm';
import { Routes } from '~/shared/constants';
import { useEnterByEmail } from '~/shared/hooks';
import { showToast } from '~/shared/lib';
import { EMAIL_INVALID_ERROR } from '../constants';
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
    clearError: clearRegisterError,
  } = useEnterByEmail();

  const {
    login,
    error: loginError,
    isLoading: isLoginLoading,
    clearError: clearLoginError,
  } = useAuthByCode();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInputError('');

    const inputType = validateInput(inputValue);

    if (!inputType) {
      setInputError(EMAIL_INVALID_ERROR);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (registerError) {
      clearRegisterError();
    }
    if (loginError) {
      clearLoginError();
    }
    if (inputError) {
      if (validateInput(newValue)) {
        setInputError('');
      }
    }
  };

  useEffect(() => {
    if (registerError) {
      showToast.error(registerError);
    }
  }, [registerError]);

  const isLoading = isRegisterLoading || isLoginLoading;
  return (
    <AuthForm
      inputValue={inputValue}
      error={inputError || registerError || loginError}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onInputChange={handleInputChange}
    />
  );
};
