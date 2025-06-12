import { useNavigate } from 'react-router-dom';

import { GetAnonCode } from '~/features/GetAnonCode';
import { Button, ButtonVariant } from '~/shared/components/Button';
import { Routes } from '~/shared/constants';
import styles from './CodePage.module.css';

export function CodePage() {
  const navigate = useNavigate();
  const handleContinue = () => {
    navigate(Routes.Auth);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Your access code</h2>
      <p className={styles.subtitle}>
        Save this code, it will be needed for login
      </p>
      <GetAnonCode />
      <Button
        type="button"
        onClick={handleContinue}
        variant={ButtonVariant.Blue}
      >
        Continue
      </Button>
    </div>
  );
}
