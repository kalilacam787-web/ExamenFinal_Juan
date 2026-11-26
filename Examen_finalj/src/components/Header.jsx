/*
 * Presenta la marca y el acceso a la canasta con el total de unidades.
 */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import logo from '../assets/logo.svg'
import { useCarritoStore } from '../store/useCarritoStore.js'

function Header() {
  // Permite navegar al inicio o a la canasta desde la cabecera.
  const navigate = useNavigate()
  // Mantiene el contador sincronizado con las unidades guardadas.
  const unidades = useCarritoStore((state) =>
    state.productos.reduce((total, producto) => total + producto.cantidad, 0),
  )

  // Actualiza el título de la pestaña cuando cambia la cantidad en la canasta.
  useEffect(() => {
    document.title =
      unidades > 0 ? `(${unidades}) Evidencia final` : 'Evidencia final'
  }, [unidades])

  return (
    <header className="header">
      <button
        type="button"
        className="header__marca"
        onClick={() => navigate('/')}
        aria-label="Ir al inicio de MercaCauca"
      >
        <img src={logo} alt="" className="header__logo" />
        <span className="header__nombre">MercaCauca</span>
      </button>
      <button
        type="button"
        className="header__canasta"
        onClick={() => navigate('/compras')}
        aria-label={`Abrir canasta, ${unidades} unidades`}
      >
        Mi canasta <span className="header__contador">{unidades}</span>
      </button>
    </header>
  )
}

export default Header
