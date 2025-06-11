import { RouterProvider } from 'react-router-dom';
import { router } from '~/shared/configs/routing';

function App() {
  return <RouterProvider router={router} />;
}

export default App; 