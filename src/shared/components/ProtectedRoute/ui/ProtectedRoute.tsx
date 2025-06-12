import type { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Routes } from '~/shared/constants';
import { useAuth } from '~/shared/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const location = useLocation();

  if (!isAuthenticated && isInitialized) {
    return <Navigate to={Routes.Auth} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
