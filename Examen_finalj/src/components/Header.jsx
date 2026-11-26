import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <Link to="/" aria-label="Ir al inicio">
        <h1>Mercado Popayán</h1>
      </Link>
      <Link to="/compras">Ver canasta</Link>
    </header>
  )
}

export default Header
