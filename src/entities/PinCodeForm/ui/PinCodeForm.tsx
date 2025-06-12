import type { FC } from 'react';
import { Button, ButtonVariant } from '~/shared/components/Button';
import { TextInput } from '~/shared/components/TextInput';
import type { PinCodeFormProps } from '../types';
import styles from './PinCodeForm.module.css';

const INPUT_LABEL = 'PIN code';

export const PinCodeForm: FC<PinCodeFormProps> = ({
  onSubmit,
  pinValue,
  handlePinChange,
  error,
  isLoading,
}) => {
  const isDisabled = isLoading || pinValue.length !== 6;

  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
      aria-label="PIN verification"
      noValidate
    >
      <fieldset className={styles.inputGroup}>
        <legend className="sr-only">{INPUT_LABEL}</legend>
        <TextInput
          type="text"
          required
          maxLength={6}
          pattern="[0-9]*"
          inputMode="numeric"
          placeholder="000000"
          value={pinValue}
          onChange={handlePinChange}
          disabled={isLoading}
          label={INPUT_LABEL}
          hideLabel
          isPin
          invalid={!!error}
          aria-required="true"
        />
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
      </fieldset>

      <Button
        variant={ButtonVariant.Blue}
        type="submit"
        disabled={isDisabled}
        aria-busy={isLoading}
      >
        {isLoading ? 'Verifying...' : 'Submit'}
      </Button>
    </form>
  );
};
