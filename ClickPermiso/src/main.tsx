import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// BrowserRouter se define dentro de App.tsx — no lo añadas aquí también.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);