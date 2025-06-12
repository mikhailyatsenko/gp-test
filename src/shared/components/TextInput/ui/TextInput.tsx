import clsx from 'clsx';
import type { TextInputProps } from '../types';
import styles from './TextInput.module.css';

export const TextInput = ({
  label,
  hideLabel,
  invalid,
  isPin,
  className,
  ...props
}: TextInputProps) => {
  return (
    <label className={clsx(styles.container, className)}>
      <span className={clsx(styles.label, { [styles.srOnly]: hideLabel })}>
        {label}
      </span>
      <div className={styles.wrapInput}>
        <input
          className={clsx(styles.TextInput, {
            [styles.invalid]: invalid,
            [styles.pinInput]: isPin,
          })}
          aria-invalid={invalid}
          {...props}
        />
      </div>
    </label>
  );
};
