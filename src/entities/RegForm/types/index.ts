import type React from 'react';

export interface RegFormProps {
  inputValue: string;
  onEmailSubmit: (e: React.FormEvent) => Promise<void>;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAnonymousSubmit: () => Promise<void>;
  inputError?: string;
  isEmailLoading?: boolean;
}
