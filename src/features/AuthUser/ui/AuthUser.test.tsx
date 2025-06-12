import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { API_URL } from '~/shared/api';
import { Routes } from '~/shared/constants';
import { server } from '~/tests/setup';
import { TestWrapper } from '~/tests/test-utils';
import { AuthUser } from './AuthUser';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('AuthUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders auth form with input field', () => {
    render(
      <TestWrapper>
        <AuthUser />
      </TestWrapper>,
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles successful email registration', async () => {
    server.use(
      http.post(`${API_URL}/user/register/email`, () => {
        return HttpResponse.json({ data: [] });
      }),
    );

    render(
      <TestWrapper>
        <AuthUser />
      </TestWrapper>,
    );

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(Routes.AuthEmail, {
        state: { email: 'test@example.com' },
      });
    });
  });

  it('handles successful code login', async () => {
    server.use(
      http.post(`${API_URL}/auth/login/code`, () => {
        return HttpResponse.json({
          data: {
            session: 'test_session',
          },
        });
      }),
    );

    render(
      <TestWrapper>
        <AuthUser />
      </TestWrapper>,
    );

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button');

    fireEvent.change(input, { target: { value: '1234567890123456' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(Routes.Home);
    });
  });
});
