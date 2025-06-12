import { Button, ButtonVariant } from '~/shared/components/Button';
import { useAuth } from '~/shared/hooks/useAuth';
import { WelcomeSection } from './components/WelcomeSection';

export const HomePage = () => {
  const { logout } = useAuth();
  return (
    <>
      <WelcomeSection title="Welcome!" />
      <Button variant={ButtonVariant.Blank} onClick={logout}>
        Logout
      </Button>
    </>
  );
};
