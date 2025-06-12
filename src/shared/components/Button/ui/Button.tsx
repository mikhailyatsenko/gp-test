import clsx from 'clsx';
import type { ButtonProps } from '../types';
import styles from './Button.module.css';

export const Button = ({
  children,
  variant,
  isLoading,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
