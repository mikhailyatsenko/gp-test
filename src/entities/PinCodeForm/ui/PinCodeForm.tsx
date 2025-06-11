import type { FC } from 'react';
import { Button, ButtonVariant } from '~/shared/components/Button';
import type { PinCodeFormProps } from '../types';
import styles from './PinCodeForm.module.css';

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
        <label htmlFor="pin-input" className="sr-only">
          PIN code
        </label>
        <input
          id="pin-input"
          name="pin"
          type="text"
          required
          maxLength={6}
          pattern="[0-9]*"
          inputMode="numeric"
          className={styles.pinInput}
          placeholder="000000"
          value={pinValue}
          onChange={handlePinChange}
          disabled={isLoading}
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
