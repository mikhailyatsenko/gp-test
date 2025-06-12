import { useNavigate } from 'react-router-dom';
import { RegUser } from '~/features/RegUser';
import { Button, ButtonVariant } from '~/shared/components/Button';
import { Routes } from '~/shared/constants';
import { SIGN_IN_TEXT } from '../constants';
import styles from './RegPage.module.css';

export const RegPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Registration</h2>
      <p className={styles.subtitle}>Enter your email to create an account</p>
      <RegUser />
      <Button
        variant={ButtonVariant.Blank}
        onClick={() => navigate(Routes.Auth)}
      >
        {SIGN_IN_TEXT}
      </Button>
    </div>
  );
};
