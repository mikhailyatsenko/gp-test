import type React from 'react';
import { type FC, useState } from 'react';
import { Button, ButtonVariant } from '~/shared/components/Button';
import { TextInput } from '~/shared/components/TextInput';
import {
  CONTINUE_WITH_EMAIL,
  EMAIL_INPUT_LABEL,
  LOADING_TEXT,
  OR_DIVIDER,
} from '../constants';
import type { RegFormProps } from '../types';
import styles from './RegForm.module.css';

export const RegForm: FC<RegFormProps> = ({
  onEmailSubmit,
  onAnonymousSubmit,
  emailError,
  anonymousError,
  isEmailLoading,
  isAnonymousLoading,
}) => {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onEmailSubmit(email);
  };

  const handleAnonymousSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAnonymousSubmit();
  };

  const isDisabled = isEmailLoading || isAnonymousLoading;

  return (
    <section aria-label="Registration options">
      <form
        className={styles.form}
        onSubmit={handleEmailSubmit}
        aria-label="Email registration"
        noValidate
      >
        <fieldset className={styles.inputGroup}>
          <legend className="sr-only">{EMAIL_INPUT_LABEL}</legend>
          <TextInput
            type="email"
            required
            placeholder={EMAIL_INPUT_LABEL}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isDisabled}
            label={EMAIL_INPUT_LABEL}
            invalid={!!emailError}
            hideLabel
            aria-required="true"
          />
          {emailError && (
            <p className={styles.error} role="alert">
              {emailError}
            </p>
          )}
        </fieldset>

        <Button
          variant={ButtonVariant.Blue}
          type="submit"
          disabled={isDisabled}
          aria-busy={isEmailLoading}
        >
          {isEmailLoading ? LOADING_TEXT : CONTINUE_WITH_EMAIL}
        </Button>
      </form>

      <div className={styles.divider}>
        <span>{OR_DIVIDER}</span>
      </div>

      <Button
        variant={ButtonVariant.Grey}
        type="button"
        onClick={handleAnonymousSubmit}
        disabled={isDisabled}
        aria-busy={isAnonymousLoading}
      >
        {isAnonymousLoading ? LOADING_TEXT : 'Anonymous Registration'}
      </Button>
    </section>
  );
};
