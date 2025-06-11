import { createBrowserRouter } from 'react-router';
import { AuthPage } from '~/pages/AuthPage';
import { AuthPinPage } from '~/pages/AuthPinPage';
import { CodePage } from '~/pages/CodePage';
import { HomePage } from '~/pages/HomePage';
import { RegPage } from '~/pages/RegPage';
import { Routes } from '~/shared/constants/routes';

export const router = createBrowserRouter([
  {
    path: Routes.Home,
    index: true,
    element: <HomePage />,
  },
  {
    path: Routes.Auth,
    element: <AuthPage />,
  },
  {
    path: Routes.AuthEmail,
    element: <AuthPinPage />,
  },
  {
    path: Routes.Reg,
    element: <RegPage />,
  },
  {
    path: Routes.Code,
    element: <CodePage />,
  },
]);
