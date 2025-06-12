import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthByPin } from '~/features/SignInByPin';

import { Routes } from '~/shared/constants';
import { AUTH_PIN_TITLE, CODE_SENT_TO } from '../constants';
import styles from './AuthEmailPage.module.css';

export const AuthPinPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate(Routes.Auth);
      return;
    }
  }, [email, navigate]);

  if (!email) return null;

  return (
    <section className={styles.formContainer}>
      <h2 className={styles.title}>{AUTH_PIN_TITLE}</h2>
      <p className={styles.subtitle}>
        {CODE_SENT_TO} {email}
      </p>

      <AuthByPin email={email} />
    </section>
  );
};
