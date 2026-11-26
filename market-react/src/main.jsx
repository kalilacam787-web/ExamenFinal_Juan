// ============================================================
// main.jsx — PUNTO DE ENTRADA
// 1. Crea la raíz de React dentro de <div id="root"> (index.html).
// 2. Envuelve la app con <BrowserRouter> para habilitar las rutas.
// 3. Importa los estilos globales (CSS puro).
// ============================================================
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  // StrictMode: en desarrollo ejecuta los efectos 2 veces para
  // ayudarnos a detectar errores (por eso usamos AbortController).
  <StrictMode>
    {/* BrowserRouter usa la URL del navegador (historial) para saber
        qué componente mostrar. Todo lo que use rutas debe ir dentro. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
