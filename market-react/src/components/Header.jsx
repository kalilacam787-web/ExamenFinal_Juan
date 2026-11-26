// ============================================================
// Header.jsx — ENCABEZADO (componente estático)
// Muestra logo, nombre de la tienda y un contador del carrito.
//
// Conceptos:
//  - Importar una imagen local (Vite la procesa como URL).
//  - Leer el estado GLOBAL de Zustand SIN props.
//  - useEffect para un "efecto secundario": cambiar el título
//    de la pestaña del navegador cada vez que cambia el carrito.
// ============================================================
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.svg';
import { useCarritoStore } from '../store/useCarritoStore.js';

function Header() {
  const navigate = useNavigate();

  // Selector de Zustand: calculamos el TOTAL de unidades del carrito.
  // Devuelve un número, así el Header solo se vuelve a pintar
  // cuando ese número cambia.
  const totalUnidades = useCarritoStore((state) =>
    state.productos.reduce((acumulado, p) => acumulado + p.cantidad, 0)
  );

  // useEffect: se ejecuta después de pintar y cada vez que
  // "totalUnidades" cambie (está en el arreglo de dependencias).
  useEffect(() => {
    document.title =
      totalUnidades > 0 ? `(${totalUnidades}) Market SENA` : 'Market SENA';
  }, [totalUnidades]);

  return (
    <header className="header">
      <div className="header__marca">
        <img src={logo} alt="Logo de Market SENA" className="header__logo" />
        <div>
          <h1 className="header__titulo">Market SENA</h1>
          <p className="header__lema">Tu mercado en línea hecho con React</p>
        </div>
      </div>

      {/* Botón del carrito: navega a /compras y muestra el contador */}
      <button
        type="button"
        className="header__carrito"
        onClick={() => navigate('/compras')}
        aria-label={`Ver carrito, ${totalUnidades} productos`}
      >
        🛒
        {/* Solo mostramos la burbuja si hay productos */}
        {totalUnidades > 0 && (
          <span className="header__burbuja">{totalUnidades}</span>
        )}
      </button>
    </header>
  );
}

export default Header;
