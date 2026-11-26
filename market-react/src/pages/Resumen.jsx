// ============================================================
// Resumen.jsx — RESUMEN DE LA COMPRA
// Ruta: /compras/resumen (hija de SectionCompras)
//
// - Calcula totales a partir del estado global (Zustand).
// - useState local para el mensaje de "compra finalizada".
// - useEffect para ocultar ese mensaje después de 4 segundos
//   (temporizador con función de limpieza).
// ============================================================
import { useState, useEffect } from 'react';

import { useCarritoStore } from '../store/useCarritoStore.js';
import { formatearPrecio } from '../utils/formato.js';

const COSTO_ENVIO = 5; // USD fijos de envío (valor de ejemplo)

function Resumen() {
  const productos = useCarritoStore((state) => state.productos);
  const vaciarCarrito = useCarritoStore((state) => state.vaciarCarrito);

  const [mensaje, setMensaje] = useState('');

  // ---------- CÁLCULOS (derivados del estado) ----------
  const unidades = productos.reduce((acc, p) => acc + p.cantidad, 0);
  const subtotal = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const envio = productos.length > 0 ? COSTO_ENVIO : 0;
  const total = subtotal + envio;

  // ---------- EFECTO: borrar el mensaje a los 4 s ----------
  useEffect(() => {
    if (!mensaje) return; // si no hay mensaje, no hacemos nada

    const temporizador = setTimeout(() => setMensaje(''), 4000);

    // Limpieza: si el componente se desmonta antes, cancelamos
    return () => clearTimeout(temporizador);
  }, [mensaje]);

  const finalizarCompra = () => {
    setMensaje(`¡Gracias por tu compra de ${formatearPrecio(total)}! 🎉`);
    vaciarCarrito(); // acción de Zustand
  };

  return (
    <div className="resumen">
      <h2>Resumen de compra</h2>

      <dl className="resumen__tabla">
        <dt>Productos distintos</dt>
        <dd>{productos.length}</dd>

        <dt>Unidades</dt>
        <dd>{unidades}</dd>

        <dt>Subtotal</dt>
        <dd>{formatearPrecio(subtotal)}</dd>

        <dt>Envío</dt>
        <dd>{formatearPrecio(envio)}</dd>

        <dt className="resumen__total">Total</dt>
        <dd className="resumen__total">{formatearPrecio(total)}</dd>
      </dl>

      <div className="resumen__acciones">
        {/* disabled: estado visual deshabilitado (ver CSS :disabled) */}
        <button
          type="button"
          className="btn btn--primario"
          onClick={finalizarCompra}
          disabled={productos.length === 0}
        >
          Finalizar compra
        </button>
        <button
          type="button"
          className="btn btn--peligro"
          onClick={vaciarCarrito}
          disabled={productos.length === 0}
        >
          Vaciar carrito
        </button>
      </div>

      {mensaje && <p className="estado estado--exito">{mensaje}</p>}
    </div>
  );
}

export default Resumen;
