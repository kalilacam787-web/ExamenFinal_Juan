import { Link } from 'react-router-dom'

import { useCarritoStore } from '../store/useCarritoStore.js'
import { formatearPrecio } from '../utils/formato.js'

function Carrito() {
  const productos = useCarritoStore((state) => state.productos)
  const sumarCantidad = useCarritoStore((state) => state.sumarCantidad)
  const restarCantidad = useCarritoStore((state) => state.restarCantidad)
  const eliminarProducto = useCarritoStore((state) => state.eliminarProducto)

  if (productos.length === 0) {
    return (
      <div className="estado estado--vacio">
        <p>Tu canasta está vacía.</p>
        <Link to="/catalogo">Ir a la vitrina</Link>
      </div>
    )
  }

  return (
    <ul>
      {productos.map((producto) => (
        <li key={producto.id}>
          {producto.imagen && (
            <img
              src={producto.imagen}
              alt={producto.titulo}
              width="80"
              loading="lazy"
            />
          )}
          <h3>{producto.titulo}</h3>
          <p>Precio: {formatearPrecio(producto.precio)}</p>
          <div>
            <button
              type="button"
              onClick={() => restarCantidad(producto.id)}
              aria-label={`Restar una unidad de ${producto.titulo}`}
            >
              −
            </button>
            <span aria-live="polite"> {producto.cantidad} </span>
            <button
              type="button"
              onClick={() => sumarCantidad(producto.id)}
              aria-label={`Agregar una unidad de ${producto.titulo}`}
            >
              +
            </button>
          </div>
          <p>Subtotal: {formatearPrecio(producto.precio * producto.cantidad)}</p>
          <button
            type="button"
            onClick={() => eliminarProducto(producto.id)}
          >
            Quitar producto
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Carrito
