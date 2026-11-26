// ============================================================
// vite.config.js
// Configuración de Vite: el empaquetador/servidor de desarrollo.
// Solo necesitamos el plugin oficial de React (JSX + Fast Refresh).
// ============================================================
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
