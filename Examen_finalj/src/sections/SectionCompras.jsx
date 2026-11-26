/*
 * Agrupa la canasta y el pedido, mostrando las unidades actuales.
 */
import { NavLink, Outlet } from 'react-router-dom'

import { useCarritoStore } from '../store/useCarritoStore.js'

function SectionCompras() {
  // Lee las cantidades del carrito para mantener actualizado el contador.
  const unidades = useCarritoStore((state) =>
    state.productos.reduce((total, producto) => total + producto.cantidad, 0),
  )

  return (
    <section>
      <h2>Mi canasta ({unidades} unidades)</h2>
      <nav aria-label="Sección de compras">
        <NavLink to="/compras" end>Mi canasta ({unidades})</NavLink>
        {' | '}
        <NavLink to="/compras/resumen">Mi pedido</NavLink>
      </nav>
      <Outlet />
    </section>
  )
}

export default SectionCompras
