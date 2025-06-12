import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './app/App';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./shared/mocks/browser');
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  const root = document.getElementById('root');
  if (!root) throw new Error('Root dom node is missing');

  createRoot(root).render(<App />);
});
