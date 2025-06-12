import { useNavigate } from 'react-router-dom';
import { AuthUser } from '~/features/AuthUser/ui/AuthUser';
import { Button, ButtonVariant } from '~/shared/components/Button';
import { Routes } from '~/shared/constants';
import styles from './AuthPage.module.css';

export const AuthPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Sign in</h2>
      <p className={styles.subtitle}>Enter your email or access code</p>
      <AuthUser />
      <Button
        variant={ButtonVariant.Blank}
        onClick={() => navigate(Routes.Reg)}
      >
        Don't have an account? Sign up
      </Button>
    </div>
  );
};
