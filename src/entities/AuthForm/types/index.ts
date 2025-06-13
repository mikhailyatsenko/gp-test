import type React from 'react';

export type AuthFormProps = {
  inputValue: string;
  error: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
