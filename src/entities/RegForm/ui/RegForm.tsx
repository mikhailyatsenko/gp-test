import type React from 'react';
import { type FC, useState } from 'react';
import { Button, ButtonVariant } from '~/shared/components/Button';
import { TextInput } from '~/shared/components/TextInput';
import {
  ANONYMOUS_REGISTRATION_LABEL,
  CONTINUE_WITH_EMAIL,
  EMAIL_INPUT_LABEL,
  EMAIL_REGISTRATION_LABEL,
  LOADING_TEXT,
  OR_DIVIDER,
  REGISTRATION_OPTIONS_LABEL,
} from '../constants';
import type { RegFormProps } from '../types';
import styles from './RegForm.module.css';

export const RegForm: FC<RegFormProps> = ({
  onEmailSubmit,
  onEmailChange,
  onAnonymousSubmit,
  inputError,
  inputValue,
  isEmailLoading,
}) => {
  const handleAnonymousSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAnonymousSubmit();
  };

  const isDisabled = isEmailLoading;
  const displayError = inputError || inputError;

  return (
    <section aria-label={REGISTRATION_OPTIONS_LABEL}>
      <form
        className={styles.form}
        onSubmit={onEmailSubmit}
        aria-label={EMAIL_REGISTRATION_LABEL}
        noValidate
      >
        <fieldset className={styles.inputGroup}>
          <legend className="sr-only">{EMAIL_INPUT_LABEL}</legend>
          <TextInput
            autoComplete="off"
            type="email"
            required
            placeholder={EMAIL_INPUT_LABEL}
            value={inputValue}
            onChange={onEmailChange}
            disabled={isDisabled}
            label={EMAIL_INPUT_LABEL}
            invalid={!!displayError}
            hideLabel
            aria-required="true"
          />
          {displayError && (
            <p className={styles.error} role="alert">
              {displayError}
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
      >
        {ANONYMOUS_REGISTRATION_LABEL}
      </Button>
    </section>
  );
};
