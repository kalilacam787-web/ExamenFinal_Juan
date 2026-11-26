// ============================================================
// Carrito.jsx — CARRITO DE COMPRAS (Zustand)
// Ruta: /compras (index de SectionCompras)
//
// Lee los productos del store y usa sus acciones:
//   sumarCantidad (+), restarCantidad (−), eliminarProducto (🗑)
// No recibe props: todo sale del estado global.
// ============================================================
import { useNavigate } from 'react-router-dom';

import { useCarritoStore } from '../store/useCarritoStore.js';
import { formatearPrecio } from '../utils/formato.js';

function Carrito() {
  const navigate = useNavigate();

  // Estado y acciones del store (un selector por cada cosa)
  const productos = useCarritoStore((state) => state.productos);
  const sumarCantidad = useCarritoStore((state) => state.sumarCantidad);
  const restarCantidad = useCarritoStore((state) => state.restarCantidad);
  const eliminarProducto = useCarritoStore((state) => state.eliminarProducto);

  // Carrito vacío: mensaje + botón para volver al catálogo
  if (productos.length === 0) {
    return (
      <div className="estado estado--vacio">
        <p>Tu carrito está vacío 🧺</p>
        <button
          type="button"
          className="btn btn--primario"
          onClick={() => navigate('/catalogo')}
        >
          Ir al catálogo
        </button>
      </div>
    );
  }

  return (
    <ul className="carrito">
      {productos.map((producto) => (
        <li key={producto.id} className="carrito__item">
          <img
            src={producto.imagen}
            alt={producto.titulo}
            className="carrito__imagen"
          />

          <div className="carrito__info">
            <h3>{producto.titulo}</h3>
            <p>{formatearPrecio(producto.precio)} c/u</p>
          </div>

          {/* Controles de cantidad */}
          <div className="contador">
            <button
              type="button"
              className="contador__btn"
              onClick={() => restarCantidad(producto.id)}
              aria-label="Restar una unidad"
            >
              −
            </button>
            <span className="contador__valor">{producto.cantidad}</span>
            <button
              type="button"
              className="contador__btn"
              onClick={() => sumarCantidad(producto.id)}
              aria-label="Sumar una unidad"
            >
              +
            </button>
          </div>

          {/* Subtotal = precio × cantidad */}
          <p className="carrito__subtotal">
            {formatearPrecio(producto.precio * producto.cantidad)}
          </p>

          <button
            type="button"
            className="btn btn--peligro"
            onClick={() => eliminarProducto(producto.id)}
          >
            🗑 Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Carrito;
