import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './app/App';

const root = document.getElementById('root');
if (!root) throw new Error('Root dom node is missing');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
