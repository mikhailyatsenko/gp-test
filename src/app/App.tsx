import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PageWrapper } from '~/shared/components/PageWrapper';
import { router } from '~/shared/configs/routing';
import { AuthProvider } from './providers/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <PageWrapper>
        <RouterProvider router={router} />
        <ToastContainer />
      </PageWrapper>
    </AuthProvider>
  );
}

export default App;
