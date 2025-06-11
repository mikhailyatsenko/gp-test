import { createBrowserRouter } from 'react-router';
import { AuthPage } from '~/pages/AuthPage';
import { AuthPinPage } from '~/pages/AuthPinPage';
import { CodePage } from '~/pages/CodePage';
import { HomePage } from '~/pages/HomePage';
import { RegPage } from '~/pages/RegPage';
import { Route } from '~/shared/constants/routes';

export const router = createBrowserRouter([
  {
    path: Route.Home,
    index: true,
    element: <HomePage />,
  },
  {
    path: Route.Auth,
    element: <AuthPage />,
  },
  {
    path: Route.AuthEmail,
    element: <AuthPinPage />,
  },
  {
    path: Route.Reg,
    element: <RegPage />,
  },
  {
    path: Route.Code,
    element: <CodePage />,
  },
]);
