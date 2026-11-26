import { NavLink, Outlet } from 'react-router-dom'

import { useCarritoStore } from '../store/useCarritoStore.js'

function SectionCompras() {
  const productosDistintos = useCarritoStore((state) => state.productos.length)

  return (
    <section>
      <h2>Mi canasta ({productosDistintos} productos)</h2>
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
