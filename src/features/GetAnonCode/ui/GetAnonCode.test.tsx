import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { API_URL } from '~/shared/api';
import { server } from '~/tests/setup';
import { TestWrapper } from '~/tests/test-utils';
import { GetAnonCode } from './GetAnonCode';

describe('GetAnonCode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders loading state initially', () => {
    server.use(
      http.post(`${API_URL}/user/register/code`, () => {
        return new Promise(() => {}); // Never resolves to simulate loading
      }),
    );

    render(
      <TestWrapper>
        <GetAnonCode />
      </TestWrapper>,
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays generated code and saves it to localStorage', async () => {
    const testCode = '1234567890123456';
    server.use(
      http.post(`${API_URL}/user/register/code`, () => {
        return HttpResponse.json({
          data: {
            login_code: testCode,
          },
        });
      }),
    );

    render(
      <TestWrapper>
        <GetAnonCode />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText(testCode)).toBeInTheDocument();
    });

    expect(localStorage.getItem('AnonymousCode')).toBe(testCode);
  });

  it('displays error message when registration fails', async () => {
    server.use(
      http.post(`${API_URL}/user/register/code`, () => {
        return HttpResponse.json(
          {
            error: {
              code: 'REGISTRATION_ERROR',
              message: 'Failed to generate code',
            },
          },
          { status: 500 },
        );
      }),
    );

    render(
      <TestWrapper>
        <GetAnonCode />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText('Failed to generate code')).toBeInTheDocument();
    });
  });
});
