import clsx from 'clsx';
import type { ButtonProps } from '../types';
import styles from './Button.module.css';

export const Button = ({
  children,
  variant,
  isLoading,
  disabled,
  className,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], className)}
      disabled={disabled || isLoading}
      type={type}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
