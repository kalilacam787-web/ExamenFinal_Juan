import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useCarritoStore } from '../store/useCarritoStore.js'
import { formatearPrecio } from '../utils/formato.js'

const COSTO_ENVIO = 5

function Resumen() {
  const productos = useCarritoStore((state) => state.productos)
  const vaciarCarrito = useCarritoStore((state) => state.vaciarCarrito)
  const [mensaje, setMensaje] = useState('')

  const unidades = productos.reduce(
    (total, producto) => total + producto.cantidad,
    0,
  )
  const subtotal = productos.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0,
  )
  const envio = productos.length > 0 ? COSTO_ENVIO : 0
  const total = subtotal + envio
  const canastaVacia = productos.length === 0

  useEffect(() => {
    if (!mensaje) return

    const temporizador = setTimeout(() => setMensaje(''), 4000)
    return () => clearTimeout(temporizador)
  }, [mensaje])

  function finalizarPedido() {
    setMensaje(`Pedido de demostración finalizado por ${formatearPrecio(total)}.`)
    vaciarCarrito()
  }

  return (
    <section>
      <h3>Resumen de mi pedido</h3>
      <p>Unidades: {unidades}</p>
      <p>Subtotal: {formatearPrecio(subtotal)}</p>
      <p>Envío (valor de ejemplo): {formatearPrecio(envio)}</p>
      <p>Total: {formatearPrecio(total)}</p>

      <div>
        <button
          type="button"
          onClick={finalizarPedido}
          disabled={canastaVacia}
        >
          Finalizar pedido
        </button>
        <button
          type="button"
          onClick={vaciarCarrito}
          disabled={canastaVacia}
        >
          Vaciar canasta
        </button>
      </div>

      {canastaVacia && (
        <p>
          La canasta está vacía. <Link to="/catalogo">Ir a la vitrina</Link>
        </p>
      )}
      {mensaje && <p role="status">{mensaje}</p>}
    </section>
  )
}

export default Resumen
