import { useNavigate } from 'react-router-dom';
import { AuthUser } from '~/features/AuthUser/ui/AuthUser';
import { Button, ButtonVariant } from '~/shared/components/Button';
import { Routes } from '~/shared/constants';
import { AUTH_SUBTITLE, AUTH_TITLE, SIGN_UP_TEXT } from '../constants';
import styles from './AuthPage.module.css';

export const AuthPage = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.formContainer}>
      <h1 className={styles.title}>{AUTH_TITLE}</h1>
      <p className={styles.subtitle}>{AUTH_SUBTITLE}</p>
      <AuthUser />
      <Button
        variant={ButtonVariant.Blank}
        onClick={() => navigate(Routes.Reg)}
        aria-label={SIGN_UP_TEXT}
      >
        {SIGN_UP_TEXT}
      </Button>
    </section>
  );
};
