import { RouterProvider } from 'react-router-dom';
import { PageWrapper } from '~/shared/components/PageWrapper';
import { router } from '~/shared/configs/routing';
import { AuthProvider } from './providers/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <PageWrapper>
        <RouterProvider router={router} />
      </PageWrapper>
    </AuthProvider>
  );
}

export default App;
