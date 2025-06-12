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
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.inputGroup}>
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
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>

      <Button
        variant={ButtonVariant.Blue}
        type="submit"
        className={styles.button}
        disabled={isLoading || pinValue.length !== 6}
      >
        Submit
      </Button>
    </form>
  );
};
