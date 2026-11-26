import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useCarritoStore } from '../store/useCarritoStore.js'

function Header() {
  const unidades = useCarritoStore((state) =>
    state.productos.reduce((total, producto) => total + producto.cantidad, 0),
  )

  useEffect(() => {
    document.title =
      unidades > 0 ? `(${unidades}) Evidencia final` : 'Evidencia final'
  }, [unidades])

  return (
    <header>
      <Link to="/" aria-label="Ir al inicio">
        <h1>Mercado Popayán</h1>
      </Link>
      <Link to="/compras">Ver canasta ({unidades})</Link>
    </header>
  )
}

export default Header
