import type {
  AuthError,
  EmptyDataResponse,
  LoginCodeParams,
  LoginEmailParams,
  RegisterCodeResponse,
  RegisterEmailParams,
  SessionResponse,
  ValidationError,
  WrongPinError,
} from './types';

export const API_URL = 'http://localhost:8080/v1';

export const api = {
  registerEmail: async ({
    email,
    lang,
  }: RegisterEmailParams): Promise<EmptyDataResponse | ValidationError> => {
    const response = await fetch(`${API_URL}/user/register/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, lang }),
    });

    if (!response.ok) {
      const error = (await response.json()) as ValidationError;
      throw new Error(error.error?.message || 'Failed to register');
    }

    return response.json();
  },

  loginEmail: async ({
    email,
    pincode,
  }: LoginEmailParams): Promise<SessionResponse> => {
    const response = await fetch(`${API_URL}/auth/login/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, pincode }),
    });

    if (!response.ok) {
      const error = (await response.json()) as WrongPinError;
      throw new Error(error.error?.message || 'Failed to login');
    }

    return response.json();
  },

  registerCode: async (): Promise<RegisterCodeResponse> => {
    const response = await fetch(`${API_URL}/user/register/code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to register');
    }

    return response.json();
  },

  loginCode: async ({ code }: LoginCodeParams): Promise<SessionResponse> => {
    const response = await fetch(`${API_URL}/auth/login/code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login_code: code }),
    });

    if (!response.ok) {
      const error = (await response.json()) as AuthError;
      throw new Error(error.error?.message || 'Failed to login');
    }

    return response.json();
  },
};
