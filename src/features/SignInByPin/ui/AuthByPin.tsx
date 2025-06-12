import type React from 'react';
import { type FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PinCodeForm } from '~/entities/PinCodeForm/ui/PinCodeForm';
import { Routes } from '~/shared/constants';
import { showToast } from '~/shared/lib';
import { ResendCode } from '../components/ResendCode/ui/ResendCode';
import { CODE_SENT } from '../constants';
import { useLoginByEmail } from '../hooks/useLoginByEmail';
import type { AuthByPinProps } from '../types';

export const AuthByPin: FC<AuthByPinProps> = ({ email }) => {
  const [pinValue, setPinValue] = useState('');
  const { login, error, isLoading } = useLoginByEmail();
  const navigate = useNavigate();

  useEffect(() => {
    showToast.success(`${CODE_SENT}`);
  }, []);

  useEffect(() => {
    if (error) {
      showToast.error(error);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pinValue.length !== 6) {
      showToast.warning('Please enter a 6-digit PIN code');
      return;
    }

    const success = await login(email, pinValue);
    if (success) {
      showToast.success('Successfully logged in!');
      navigate(Routes.Home);
    }
  };

  const handlePinChange = (e: React.ChangeEvent) => {
    setPinValue((e.target as HTMLInputElement).value.replace(/\D/g, ''));
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
