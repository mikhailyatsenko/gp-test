import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { API_URL } from '~/shared/api';
import { Routes } from '~/shared/constants';
import { showToast } from '~/shared/lib';
import { server } from '~/tests/setup';
import { TestWrapper } from '~/tests/test-utils';
import { AuthByPin } from './AuthByPin';

vi.mock('~/shared/lib', async () => {
  const actual = await vi.importActual('~/shared/lib');
  return {
    ...actual,
    showToast: {
      success: vi.fn(),
      error: vi.fn(),
      warning: vi.fn(),
    },
  };
});

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('AuthByPin', () => {
  const testEmail = 'test@example.com';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders pin code form', () => {
    render(
      <TestWrapper>
        <AuthByPin email={testEmail} />
      </TestWrapper>,
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows success toast on mount', () => {
    render(
      <TestWrapper>
        <AuthByPin email={testEmail} />
      </TestWrapper>,
    );

    expect(showToast.success).toHaveBeenCalled();
  });

  it('handles successful login', async () => {
    server.use(
      http.post(`${API_URL}/auth/login/email`, () => {
        return HttpResponse.json({
          data: {
            session: 'test_session',
          },
        });
      }),
    );

    render(
      <TestWrapper>
        <AuthByPin email={testEmail} />
      </TestWrapper>,
    );

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button');

    fireEvent.change(input, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(showToast.success).toHaveBeenCalledWith('Successfully logged in!');
      expect(mockNavigate).toHaveBeenCalledWith(Routes.Home);
    });
  });

  it('handles login error', async () => {
    server.use(
      http.post(`${API_URL}/auth/login/email`, () => {
        return HttpResponse.json(
          {
            error: {
              code: 'WRONG_PIN_CODE',
              message: 'Invalid PIN code',
            },
          },
          { status: 401 },
        );
      }),
    );

    render(
      <TestWrapper>
        <AuthByPin email={testEmail} />
      </TestWrapper>,
    );

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button');

    fireEvent.change(input, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(showToast.error).toHaveBeenCalled();
    });
  });

  it('filters non-digit characters from pin input', () => {
    render(
      <TestWrapper>
        <AuthByPin email={testEmail} />
      </TestWrapper>,
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '123abc456' } });

    expect(input).toHaveValue('123456');
  });
});
