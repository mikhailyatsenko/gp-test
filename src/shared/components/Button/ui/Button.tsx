import type { ButtonProps } from '../types';
import styles from './Button.module.css';

export const Button = ({
  children,
  variant,
  isLoading,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className ?? ''}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
