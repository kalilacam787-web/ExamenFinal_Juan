import { NavLink, Outlet } from 'react-router-dom'

function SectionCompras() {
  return (
    <section>
      <h2>Mi canasta</h2>
      <nav aria-label="Sección de compras">
        <NavLink to="/compras" end>Productos</NavLink>
        {' | '}
        <NavLink to="/compras/resumen">Resumen</NavLink>
      </nav>
      <Outlet />
    </section>
  )
}

export default SectionCompras
