import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import logo from '../assets/logo.svg'
import { useCarritoStore } from '../store/useCarritoStore.js'

function Header() {
  const navigate = useNavigate()
  const unidades = useCarritoStore((state) =>
    state.productos.reduce((total, producto) => total + producto.cantidad, 0),
  )

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
