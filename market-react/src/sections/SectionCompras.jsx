// ============================================================
// SectionCompras.jsx — SECTION 2
// Ruta PADRE (/compras) con:
//  - Imagen de portada.
//  - Pestañas con <NavLink> hacia sus rutas hijas.
//  - <Outlet/> donde se pinta:
//      /compras          -> Carrito
//      /compras/resumen  -> Resumen
// También lee de Zustand cuántos productos distintos hay,
// para mostrarlo en la pestaña (sin props).
// ============================================================
import { NavLink, Outlet } from 'react-router-dom';

import banner from '../assets/banner-compras.svg';
import { useCarritoStore } from '../store/useCarritoStore.js';

function SectionCompras() {
  // Cantidad de productos DIFERENTES en el carrito
  const distintos = useCarritoStore((state) => state.productos.length);

  return (
    <section className="seccion">
      <img
        src={banner}
        alt="Portada de compras con un carrito de mercado"
        className="seccion__banner"
      />

      <div className="pestanas">
        <NavLink to="/compras" end className="pestanas__item">
          Carrito ({distintos})
        </NavLink>
        <NavLink to="/compras/resumen" className="pestanas__item">
          Resumen de compra
        </NavLink>
      </div>

      <div className="seccion__contenido">
        <Outlet />
      </div>
    </section>
  );
}

export default SectionCompras;
