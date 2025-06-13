import type React from 'react';

export interface PinCodeFormProps {
  pinValue: string;
  handlePinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  error: string;
  isLoading: boolean;
}
