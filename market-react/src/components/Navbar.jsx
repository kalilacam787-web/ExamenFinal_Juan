// ============================================================
// Navbar.jsx — BARRA DE NAVEGACIÓN (componente estático)
// 4 botones que cambian de ruta usando el hook useNavigate.
//
// ¿Por qué botones y no <Link>?
//  useNavigate permite navegar desde CÓDIGO (un onClick, después
//  de guardar un formulario, etc.). Aquí lo practicamos con botones.
//
// useLocation nos dice en qué URL estamos para marcar el botón
// activo con una clase CSS (estado visual "activo").
// ============================================================
import { useNavigate, useLocation } from 'react-router-dom';

// Arreglo de configuración: así no repetimos 4 veces el mismo botón.
//  - exacta: true  -> activo solo si la URL es exactamente esa ruta
//  - exacta: false -> activo también en sus sub-rutas (/catalogo/axios)
const BOTONES = [
  { texto: 'Inicio', icono: '🏠', ruta: '/', exacta: true },
  { texto: 'Catálogo', icono: '🛍️', ruta: '/catalogo', exacta: false },
  { texto: 'Carrito', icono: '🛒', ruta: '/compras', exacta: true },
  { texto: 'Resumen', icono: '🧾', ruta: '/compras/resumen', exacta: true },
];

function Navbar() {
  const navigate = useNavigate(); // función para cambiar de ruta
  const { pathname } = useLocation(); // URL actual, ej: "/catalogo/axios"

  // Decide si un botón debe verse como "activo"
  const estaActivo = (boton) =>
    boton.exacta ? pathname === boton.ruta : pathname.startsWith(boton.ruta);

  return (
    <nav className="navbar" aria-label="Navegación principal">
      {BOTONES.map((boton) => (
        <button
          key={boton.ruta}
          type="button"
          // Clase base + clase de estado activo (CSS puro)
          className={`navbar__btn ${estaActivo(boton) ? 'navbar__btn--activo' : ''}`}
          onClick={() => navigate(boton.ruta)}
        >
          <span aria-hidden="true">{boton.icono}</span> {boton.texto}
        </button>
      ))}
    </nav>
  );
}

export default Navbar;
