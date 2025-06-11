import { http, HttpResponse } from 'msw';
import { API_URL } from '~/shared/api/api';

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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
];
