import type { FC } from 'react';
import { Button, ButtonVariant } from '~/shared/components/Button';
import { TextInput } from '~/shared/components/TextInput';
import type { AuthFormProps } from '../types';
import styles from './AuthForm.module.css';

const INPUT_LABEL = 'Email or access code';

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
        <TextInput
          id="auth-input"
          name="auth"
          type="text"
          required
          placeholder={INPUT_LABEL}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading}
          label={INPUT_LABEL}
          hideLabel
          invalid={!!error}
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>

      <Button variant={ButtonVariant.Blue} disabled={isLoading}>
        Continue
      </Button>
    </form>
  );
};
