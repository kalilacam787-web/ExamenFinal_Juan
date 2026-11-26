// ============================================================
// Layout.jsx — ESTRUCTURA GENERAL DE LA PÁGINA
// Header, Navbar y Footer son ESTÁTICOS: siempre se ven.
// <Outlet/> es el "hueco" donde React Router pinta la ruta hija
// activa (Inicio, SectionCatalogo o SectionCompras).
//
// Nota: NO usamos children. El Outlet reemplaza esa necesidad.
// ============================================================
import { Outlet } from 'react-router-dom';

import Header from '../components/Header.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function Layout() {
  return (
    <div className="app">
      <Header />
      <Navbar />

      {/* Contenido que cambia según la URL */}
      <main className="contenido">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
