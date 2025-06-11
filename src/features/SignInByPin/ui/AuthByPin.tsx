import type React from 'react';
import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PinCodeForm } from '~/entities/PinCodeForm/ui/PinCodeForm';
import { ResendCode } from '../components/ResendCode/ui/ResendCode';
import { useLoginByEmail } from '../hooks/useLoginByEmail';
import type { AuthByPinProps } from '../types';

export const AuthByPin: FC<AuthByPinProps> = ({ email }) => {
  const [pinValue, setPinValue] = useState('');
  const { login, error, isLoading } = useLoginByEmail();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pinValue.length !== 6) return;

    const success = await login(email, pinValue);
    if (success) {
      navigate('/');
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
