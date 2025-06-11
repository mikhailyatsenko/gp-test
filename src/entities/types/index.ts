import type React from 'react';

export type AuthFormProps = {
  inputValue: string;
  setInputValue: (value: string) => void;
  error: string;
  isLoading: boolean;

  onSubmit: (e: React.FormEvent) => void;
};
