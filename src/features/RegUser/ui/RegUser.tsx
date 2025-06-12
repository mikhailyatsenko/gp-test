import type React from 'react';
import { useNavigate } from 'react-router-dom';
import { RegForm } from '~/entities/RegForm';
import { useRegisterAnonymous } from '../../GetAnonCode/hooks/useRegisterAnonymous';
import { useRegisterByEmail } from '../hooks/useRegisterByEmail';

export const RegUser = () => {
  const navigate = useNavigate();
  const {
    register: registerEmail,
    error: emailError,
    isLoading: isEmailLoading,
  } = useRegisterByEmail();
  const {
    register: registerAnonymous,
    error: anonymousError,
    isLoading: isAnonymousLoading,
  } = useRegisterAnonymous();

  const handleEmailSubmit = async (email: string) => {
    const success = await registerEmail(email);
    if (success) {
      navigate('/auth/email', { state: { email } });
    }
  };

  const handleAnonymousSubmit = async () => {
    navigate('/reg/code');
  };

  return (
    <RegForm
      onEmailSubmit={handleEmailSubmit}
      onAnonymousSubmit={handleAnonymousSubmit}
      emailError={emailError}
      anonymousError={anonymousError}
      isEmailLoading={isEmailLoading}
      isAnonymousLoading={isAnonymousLoading}
    />
  );
};
