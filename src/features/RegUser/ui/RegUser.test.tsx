import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { API_URL } from '~/shared/api';
import { Routes } from '~/shared/constants';
import { server } from '~/tests/setup';
import { TestWrapper } from '~/tests/test-utils';
import { RegUser } from './RegUser';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('RegUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders registration form', () => {
    render(
      <TestWrapper>
        <RegUser />
      </TestWrapper>,
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('Continue with Email')).toBeInTheDocument();
    expect(screen.getByText('Anonymous Registration')).toBeInTheDocument();
  });

  it('handles successful email registration', async () => {
    server.use(
      http.post(`${API_URL}/user/register/email`, () => {
        return HttpResponse.json({ data: [] });
      }),
    );

    render(
      <TestWrapper>
        <RegUser />
      </TestWrapper>,
    );

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByText('Continue with Email');

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(Routes.AuthEmail, {
        state: { email: 'test@example.com' },
      });
    });
  });

  it('navigates to anonymous registration', async () => {
    render(
      <TestWrapper>
        <RegUser />
      </TestWrapper>,
    );

    const anonymousButton = screen.getByText('Anonymous Registration');
    fireEvent.click(anonymousButton);

    expect(mockNavigate).toHaveBeenCalledWith(Routes.RegCode);
  });
});
