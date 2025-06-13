import type React from 'react';
import { type FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PinCodeForm } from '~/entities/PinCodeForm/ui/PinCodeForm';
import { Routes } from '~/shared/constants';
import { showToast } from '~/shared/lib';
import { ResendCode } from '../components/ResendCode/ui/ResendCode';
import { CODE_SENT, LOGIN_SUCCESS, PIN_LENGTH_ERROR } from '../constants';
import { useLoginByEmail } from '../hooks/useLoginByEmail';
import type { AuthByPinProps } from '../types';

export const AuthByPin: FC<AuthByPinProps> = ({ email }) => {
  const [pinValue, setPinValue] = useState('');
  const { login, error, isLoading } = useLoginByEmail();
  const navigate = useNavigate();

  useEffect(() => {
    showToast.success(CODE_SENT);
  }, []);

  useEffect(() => {
    if (error) {
      showToast.error(error);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pinValue.length !== 6) {
      showToast.warning(PIN_LENGTH_ERROR);
      return;
    }

    const success = await login(email, pinValue);
    if (success) {
      showToast.success(LOGIN_SUCCESS);
      navigate(Routes.Home);
    }
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPinValue(e.target.value.replace(/\D/g, ''));
  };

  return (
    <>
      <PinCodeForm
        onSubmit={handleSubmit}
        pinValue={pinValue}
        handlePinChange={handlePinChange}
        error={error}
        isLoading={isLoading}
      />
      <ResendCode email={email} />
    </>
  );
};
