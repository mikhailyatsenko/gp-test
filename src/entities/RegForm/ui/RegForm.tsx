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

  return (
    <>
      <form className={styles.form} onSubmit={handleEmailSubmit}>
        <div className={styles.inputGroup}>
          <TextInput
            type="email"
            required
            placeholder={EMAIL_INPUT_LABEL}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isEmailLoading || isAnonymousLoading}
            label={EMAIL_INPUT_LABEL}
            invalid={!!emailError}
            hideLabel
          />
          {emailError && <p className={styles.error}>{emailError}</p>}
        </div>

        <Button
          variant={ButtonVariant.Blue}
          type="submit"
          className={styles.button}
          disabled={isEmailLoading || isAnonymousLoading}
        >
          {isEmailLoading ? LOADING_TEXT : CONTINUE_WITH_EMAIL}
        </Button>
      </form>

      <div className={styles.divider}>
        <span>{OR_DIVIDER}</span>
      </div>

      <form className={styles.form} onSubmit={handleAnonymousSubmit}>
        {anonymousError && <p className={styles.error}>{anonymousError}</p>}
        <Button
          variant={ButtonVariant.Grey}
          type="submit"
          className={styles.button}
          disabled={isEmailLoading || isAnonymousLoading}
        >
          {isAnonymousLoading ? 'Loading...' : 'Anonymous Registration'}
        </Button>
      </form>
    </>
  );
};
