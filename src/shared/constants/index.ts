export enum Routes {
  Home = '/',
  Auth = '/auth',
  Reg = '/reg',
  AuthEmail = '/auth/email',
  RegCode = '/reg/code',
}

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
