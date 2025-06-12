import type { FC } from 'react';
import { Button, ButtonVariant } from '~/shared/components/Button';
import { TextInput } from '~/shared/components/TextInput';
import { CONTINUE_BUTTON_TEXT, INPUT_LABEL } from '../constants';
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
    <form
      className={styles.form}
      onSubmit={onSubmit}
      aria-label="Authentication form"
      noValidate
    >
      <fieldset className={styles.inputGroup}>
        <legend className="sr-only" id="auth-input-label">
          {INPUT_LABEL}
        </legend>
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
          aria-required="true"
        />
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
      </fieldset>

      <Button variant={ButtonVariant.Blue} disabled={isLoading} type="submit">
        {CONTINUE_BUTTON_TEXT}
      </Button>
    </form>
  );
};
