/*
 * Organiza las pestañas de Fetch y Axios y muestra su contenido anidado.
 */
import { NavLink, Outlet } from 'react-router-dom'

import banner from '../assets/banner-catalogo.svg'

function SectionCatalogo() {
  return (
    <section className="seccion-catalogo">
      <img
        src={banner}
        alt="Portada de la vitrina de productos"
        className="seccion-catalogo__banner"
      />
      <nav className="catalogo__pestanas" aria-label="Opciones de la vitrina">
        <NavLink to="/catalogo" end className="catalogo__pestana">
          Cargados con fetch
        </NavLink>
        <NavLink to="/catalogo/axios" className="catalogo__pestana">
          Cargados con Axios
        </NavLink>
      </nav>
      <div className="seccion-catalog__contenido">
        <Outlet />
      </div>
    </section>
  )
}

export default SectionCatalogo
