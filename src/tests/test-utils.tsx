import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '~/app/providers/AuthProvider';

interface TestWrapperProps {
  children: ReactNode;
  initialRoute?: string;
}

export function TestWrapper({
  children,
  initialRoute = '/',
}: TestWrapperProps) {
  return (
    <MemoryRouter initialEntries={[initialRoute]}>
      <AuthProvider>{children}</AuthProvider>
    </MemoryRouter>
  );
}
