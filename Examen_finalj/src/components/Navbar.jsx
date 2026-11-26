import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav aria-label="Navegación principal">
      <NavLink to="/" end>Inicio</NavLink>
      {' | '}
      <NavLink to="/catalogo">Vitrina</NavLink>
      {' | '}
      <NavLink to="/compras">Canasta</NavLink>
      {' | '}
      <NavLink to="/compras/resumen">Resumen</NavLink>
    </nav>
  )
}

export default Navbar
