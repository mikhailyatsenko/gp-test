export const API_URL = 'http://localhost:8080';

interface RegisterEmailParams {
  email: string;
  lang: string;
}

interface LoginEmailParams {
  email: string;
  pincode: string;
}

interface LoginCodeParams {
  code: string;
}

export const api = {
  registerEmail: async ({ email, lang }: RegisterEmailParams) => {
    return fetch(`${API_URL}/user/register/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, lang }),
    });
  },

  loginEmail: async ({ email, pincode }: LoginEmailParams) => {
    return fetch(`${API_URL}/auth/login/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, pincode }),
    });
  },

  registerCode: async () => {
    return fetch(`${API_URL}/user/register/code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  loginCode: async ({ code }: LoginCodeParams) => {
    return fetch(`${API_URL}/auth/login/code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login_code: code }),
    });
  },
};
