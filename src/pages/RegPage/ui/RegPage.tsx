import { useNavigate } from 'react-router-dom';
import { RegUser } from '~/features/RegUser';
import { Button, ButtonVariant } from '~/shared/components/Button';
import { Routes } from '~/shared/constants';
import styles from './RegPage.module.css';

export const RegPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Registration</h2>
      <RegUser />
      <Button
        variant={ButtonVariant.Blank}
        className={styles.link}
        onClick={() => navigate(Routes.Auth)}
      >
        Already have an account? Sign in
      </Button>
    </div>
  );
};
