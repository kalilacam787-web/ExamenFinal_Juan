/*
 * Calcula el pedido, muestra sus totales y permite confirmarlo o vaciar la canasta.
 */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useCarritoStore } from '../store/useCarritoStore.js'
import { formatearPrecio } from '../utils/formato.js'

const COSTO_ENVIO = 5

function Resumen() {
  // Lee el contenido actual para calcular unidades, subtotal y total.
  const productos = useCarritoStore((state) => state.productos)
  // Usa la acción global para vaciar la canasta al confirmar o cancelar.
  const vaciarCarrito = useCarritoStore((state) => state.vaciarCarrito)
  // Guarda el mensaje temporal que confirma el pedido.
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

  // Oculta el aviso unos segundos después de mostrarlo.
  useEffect(() => {
    if (!mensaje) return

    const temporizador = setTimeout(() => setMensaje(''), 4000)
    return () => clearTimeout(temporizador)
  }, [mensaje])

  function finalizarPedido() {
    setMensaje(`Pedido confirmado por ${formatearPrecio(total)} (demostración).`)
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
        <p className="estado estado--vacio">
          La canasta está vacía. <Link to="/catalogo">Ir a la vitrina</Link>
        </p>
      )}
      {mensaje && (
        <p className="estado estado--exito" role="status">
          {mensaje}
        </p>
      )}
    </section>
  )
}

export default Resumen
