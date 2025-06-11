import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthByPin } from '~/features/SignInByPin';

import styles from './AuthEmailPage.module.css';

export const AuthPinPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/auth');
      return;
    }
  }, [email, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Введите PIN-код</h2>
        <p className={styles.subtitle}>Код отправлен на {email}</p>

        <AuthByPin email={email} />
      </div>
    </div>
  );
};
