import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ButtonVariant } from '../constants';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: ButtonVariant;
  isLoading?: boolean;
}
