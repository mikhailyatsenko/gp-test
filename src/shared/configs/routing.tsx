import { createBrowserRouter } from 'react-router';
import { Route } from '~/shared/constants/routes';
import { HomePage } from '~/pages/HomePage';
import { AuthPage } from '~/pages/AuthPage';
import { RegPage } from '~/pages/RegPage';
import { AuthPinPage } from '~/pages/AuthPinPage';
import { CodePage } from '~/pages/CodePage';


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
        path: Route.AuthPin,
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
])