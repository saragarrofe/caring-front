// Punto de entrada: crea el root y renderiza <App />. Si usas providers (Router, Query, Context), suelen ir aquí.

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App /> {/*nos permitira que la app sea mas flexible */}
  </StrictMode>,
);
