import type React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegForm } from '~/entities/RegForm';
import { Routes } from '~/shared/constants';
import { useEnterByEmail } from '~/shared/hooks';
import { showToast } from '~/shared/lib';
import { getEmailValidationError } from '../lib/getEmailValidationError';

export const RegUser = () => {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);

  const {
    register: registerEmail,
    error: registerError,
    isLoading: isEmailLoading,
    clearError: clearRegisterError,
  } = useEnterByEmail();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = getEmailValidationError(emailValue);
    if (validationError) {
      setInputError(validationError);
      return;
    }

    if (!inputError) {
      const success = await registerEmail(emailValue);
      if (success) {
        navigate(Routes.AuthEmail, { state: { email: emailValue } });
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmailValue(newEmail);
    if (registerError) {
      clearRegisterError();
    }
    if (inputError) {
      setInputError(getEmailValidationError(newEmail));
    }
  };

  const handleAnonymousSubmit = async () => {
    navigate(Routes.RegCode);
  };

  useEffect(() => {
    if (registerError) {
      showToast.error(registerError);
    }
  }, [registerError]);

  return (
    <RegForm
      onEmailSubmit={handleEmailSubmit}
      onEmailChange={handleEmailChange}
      onAnonymousSubmit={handleAnonymousSubmit}
      inputValue={emailValue}
      inputError={inputError || registerError}
      isEmailLoading={isEmailLoading}
    />
  );
};
