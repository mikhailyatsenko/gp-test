import { EMAIL_REGEX } from '~/shared/constants';
import { EMAIL_INVALID_ERROR, EMAIL_REQUIRED_ERROR } from '../constants';

export const getEmailValidationError = (email: string): string | null => {
  if (!email) {
    return EMAIL_REQUIRED_ERROR;
  }
  if (!EMAIL_REGEX.test(email)) {
    return EMAIL_INVALID_ERROR;
  }
  return null;
};
