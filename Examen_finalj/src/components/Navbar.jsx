import { useLocation, useNavigate } from 'react-router-dom'

const OPCIONES = [
  { texto: 'Inicio', ruta: '/' },
  { texto: 'Vitrina', ruta: '/catalogo' },
  { texto: 'Mi canasta', ruta: '/compras' },
  { texto: 'Mi pedido', ruta: '/compras/resumen' },
]

function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const estaActivo = (ruta) =>
    pathname === ruta ||
    (ruta === '/catalogo' && pathname.startsWith('/catalogo/'))

  return (
    <nav className="navbar" aria-label="Navegación principal">
      {OPCIONES.map(({ texto, ruta }) => {
        const activo = estaActivo(ruta)

        return (
          <button
            key={ruta}
            type="button"
            className={`navbar__boton${activo ? ' navbar__boton--activo' : ''}`}
            aria-current={activo ? 'page' : undefined}
            onClick={() => navigate(ruta)}
          >
            {texto}
          </button>
        )
      })}
    </nav>
  )
}

export default Navbar
