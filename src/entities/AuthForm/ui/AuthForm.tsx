import type { FC } from 'react';
import { Button, ButtonVariant } from '~/shared/components/Button';
import type { AuthFormProps } from '../types';
import styles from './AuthForm.module.css';

export const AuthForm: FC<AuthFormProps> = ({
  inputValue,
  setInputValue,
  error,
  isLoading,
  onSubmit,
}) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading}
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>

      <Button variant={ButtonVariant.Blue} disabled={isLoading}>
        Continue
      </Button>
    </form>
  );
};
