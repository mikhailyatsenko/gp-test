import type React from 'react';
import { type FC, useState } from 'react';
import { Button, ButtonVariant } from '~/shared/components/Button';
import { TextInput } from '~/shared/components/TextInput';
import type { RegFormProps } from '../types';
import styles from './RegForm.module.css';

const INPUT_LABEL = 'Email';

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
            placeholder={INPUT_LABEL}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isEmailLoading || isAnonymousLoading}
            label={INPUT_LABEL}
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
          {isEmailLoading ? 'Loading...' : 'Continue with Email'}
        </Button>
      </form>

      <div className={styles.divider}>
        <span>or</span>
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
