import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterByEmail } from '~/shared/hooks';
import { useAuthByCode } from '../hooks/useAuthByCode';
import { validateInput } from '../lib/validateInput';
import styles from './AuthPage.module.css';

export const AuthPage = () => {
  const navigate = useNavigate();
  const {
    register,
    error: registerError,
    isLoading: isRegisterLoading,
  } = useRegisterByEmail();
  const {
    login,
    error: loginError,
    isLoading: isLoginLoading,
  } = useAuthByCode();

  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const isLoading = isRegisterLoading || isLoginLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const inputType = validateInput(input);

    if (!inputType) {
      setError('Enter valid email or 16-digit code');
      return;
    }

    if (inputType === 'email') {
      const success = await register(input);
      if (success) {
        navigate('/auth/email', { state: { email: input } });
      }
    } else {
      const success = await login(input);
      if (success) {
        navigate('/');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Sign in</h2>
        <p className={styles.subtitle}>Enter your email or access code</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="auth-input" className="sr-only">
              Email or access code
            </label>
            <input
              id="auth-input"
              name="auth"
              type="text"
              required
              className={styles.input}
              placeholder="Email or access code"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            {(error || registerError || loginError) && (
              <p className={styles.error}>
                {error || registerError || loginError}
              </p>
            )}
          </div>

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Continue'}
          </button>
        </form>

        <div className={styles.links}>
          <button
            type="button"
            className={styles.link}
            onClick={() => navigate('/reg')}
            disabled={isLoading}
          >
            Registration
          </button>
        </div>
      </div>
    </div>
  );
};
