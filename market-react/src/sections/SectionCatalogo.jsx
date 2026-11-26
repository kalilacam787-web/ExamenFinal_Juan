// ============================================================
// SectionCatalogo.jsx — SECTION 1
// Es una ruta PADRE (/catalogo). Tiene:
//  - Una imagen de portada (banner) importada desde /assets.
//  - Pestañas con <NavLink> hacia sus rutas HIJAS.
//  - Un <Outlet/> donde se pinta la hija activa:
//      /catalogo        -> ProductosFetch
//      /catalogo/axios  -> ProductosAxios
// ============================================================
import { NavLink, Outlet } from 'react-router-dom';

import banner from '../assets/banner-catalogo.svg';

function SectionCatalogo() {
  return (
    <section className="seccion">
      {/* Imagen de la sección */}
      <img
        src={banner}
        alt="Portada del catálogo con bolsas y cajas de compras"
        className="seccion__banner"
      />

      {/* Rutas internas de la sección.
          NavLink agrega automáticamente la clase "active" a la pestaña
          de la ruta actual. "end" evita que /catalogo quede activo
          cuando estamos en /catalogo/axios. */}
      <div className="pestanas">
        <NavLink to="/catalogo" end className="pestanas__item">
          Cargados con fetch
        </NavLink>
        <NavLink to="/catalogo/axios" className="pestanas__item">
          Cargados con Axios
        </NavLink>
      </div>

      {/* Aquí aparece ProductosFetch o ProductosAxios */}
      <div className="seccion__contenido">
        <Outlet />
      </div>
    </section>
  );
}

export default SectionCatalogo;
