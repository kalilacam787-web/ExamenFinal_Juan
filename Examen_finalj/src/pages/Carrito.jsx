/*
 * Muestra los productos de la canasta y permite ajustar sus cantidades o quitarlos.
 */
import { Link } from 'react-router-dom'

import { useCarritoStore } from '../store/useCarritoStore.js'
import { formatearPrecio } from '../utils/formato.js'

function Carrito() {

  // Lee los productos que se muestran en la canasta.
  const productos = useCarritoStore((state) => state.productos)
  // Suma una unidad al producto seleccionado.
  const sumarCantidad = useCarritoStore((state) => state.sumarCantidad)
  // Resta una unidad al producto seleccionado.
  const restarCantidad = useCarritoStore((state) => state.restarCantidad)
  // Obtiene la acción para quitar un producto por completo.
  const eliminarProducto = useCarritoStore((state) => state.eliminarProducto)

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

      <div className="estado estado--vacio">
        <p>Tu canasta está vacía.</p>
        <Link to="/catalogo">Ir a la vitrina</Link>
      </div>
      
    )
  }

  return (
    <section aria-labelledby="carrito-resumen-titulo">
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
            <p>
              Subtotal: {formatearPrecio(producto.precio * producto.cantidad)}
            </p>
            <button
              type="button"
              onClick={() => eliminarProducto(producto.id)}
            >
              Quitar producto
            </button>
          </li>
        ))}
      </ul>
      <div className="carrito__resumen">
        <h3 id="carrito-resumen-titulo">Resumen de la canasta</h3>
        <p>Unidades: {unidades}</p>
        <p>Subtotal: {formatearPrecio(subtotal)}</p>
        <Link to="/compras/resumen">Continuar al resumen del pedido</Link>
      </div>
    </section>
  )
}

export default Carrito
