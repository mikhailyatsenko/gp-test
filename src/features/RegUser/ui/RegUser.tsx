import { useNavigate } from 'react-router-dom';
import { RegForm } from '~/entities/RegForm';
import { Routes } from '~/shared/constants';
import { useEnterByEmail } from '~/shared/hooks';

export const RegUser = () => {
  const navigate = useNavigate();
  const {
    register: registerEmail,
    error: emailError,
    isLoading: isEmailLoading,
  } = useEnterByEmail();

  const handleEmailSubmit = async (email: string) => {
    const success = await registerEmail(email);
    if (success) {
      navigate(Routes.AuthEmail, { state: { email } });
    }
  };

  const handleAnonymousSubmit = async () => {
    navigate(Routes.RegCode);
  };

  return (
    <RegForm
      onEmailSubmit={handleEmailSubmit}
      onAnonymousSubmit={handleAnonymousSubmit}
      emailError={emailError}
      isEmailLoading={isEmailLoading}
    />
  );
};
