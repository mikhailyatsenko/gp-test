import { EMAIL_REGEX } from '~/shared/constants';

export const validateInput = (value: string) => {
  if (EMAIL_REGEX.test(value)) {
    return 'email';
  }

  if (/^\d{16}$/.test(value)) {
    return 'code';
  }
  return null;
};
