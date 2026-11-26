import { Link } from 'react-router-dom'

import { useCarritoStore } from '../store/useCarritoStore.js'
import { formatearPrecio } from '../utils/formato.js'

function Resumen() {
  const productos = useCarritoStore((state) => state.productos)
  const unidades = productos.reduce(
    (total, producto) => total + producto.cantidad,
    0,
  )
  const subtotal = productos.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0,
  )

  if (productos.length === 0) {
    return (
      <div>
        <p>No tienes productos en la canasta.</p>
        <Link to="/catalogo">Ir a la vitrina</Link>
      </div>
    )
  }

  return (
    <section>
      <h3>Resumen de la canasta</h3>
      <p>Productos distintos: {productos.length}</p>
      <p>Unidades: {unidades}</p>
      <p>Total: {formatearPrecio(subtotal)}</p>
      <p>Los precios son datos de demostración en USD.</p>
    </section>
  )
}

export default Resumen
