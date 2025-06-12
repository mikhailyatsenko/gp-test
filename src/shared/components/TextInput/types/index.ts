import type { ComponentProps } from 'react';

export interface TextInputProps extends ComponentProps<'input'> {
  label: string;
  hideLabel?: boolean;
  invalid?: boolean;
  isPin?: boolean;
}
