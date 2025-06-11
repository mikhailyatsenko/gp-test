import { http, HttpResponse } from 'msw';
import { API_URL } from '~/shared/api';

const VALID_PIN = '123456';

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const generateCode = () => {
  return Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join(
    '',
  );
};

export const handlers = [
  http.post(`${API_URL}/user/register/email`, async ({ request }) => {
    const body = (await request.json()) as { email: string; lang: string };

    if (!isValidEmail(body.email)) {
      return HttpResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid email format',
            details: [
              {
                field: 'email',
                message: 'Email address format is incorrect',
              },
            ],
          },
        },
        { status: 422 },
      );
    }

    return HttpResponse.json(
      {
        data: {
          message: 'PIN code sent',
        },
      },
      { status: 200 },
    );
  }),

  // Login with email + PIN
  http.post(`${API_URL}/auth/login/email`, async ({ request }) => {
    const body = (await request.json()) as { email: string; pincode: string };

    if (!isValidEmail(body.email)) {
      return HttpResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid email format',
          },
        },
        { status: 422 },
      );
    }

    if (body.pincode !== VALID_PIN) {
      return HttpResponse.json(
        {
          error: {
            code: 'WRONG_PIN_CODE',
            message: 'PIN code expired or missing',
          },
        },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      data: {
        session: `session_${Date.now()}`,
      },
    });
  }),

  // Anonymous registration
  http.post(`${API_URL}/user/register/code`, async () => {
    const code = generateCode();

    return HttpResponse.json({
      data: {
        login_code: code,
        session: `session_${Date.now()}`,
      },
    });
  }),

  // Login with code
  http.post(`${API_URL}/auth/login/code`, async ({ request }) => {
    const body = (await request.json()) as { login_code: string };

    if (!/^\d{16}$/.test(body.login_code)) {
      return HttpResponse.json(
        {
          error: {
            code: 'AUTHENTICATION_ERROR',
            message: 'Invalid code format',
          },
        },
        { status: 422 },
      );
    }

    return HttpResponse.json({
      data: {
        session: `session_${Date.now()}`,
      },
    });
  }),
];
