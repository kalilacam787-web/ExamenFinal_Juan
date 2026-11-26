/*
 * Ofrece los accesos principales y marca la sección que corresponde a la URL.
 */
import { useLocation, useNavigate } from 'react-router-dom'

const OPCIONES = [
  { texto: 'Inicio', ruta: '/' },
  { texto: 'Vitrina', ruta: '/catalogo' },
  { texto: 'Mi canasta', ruta: '/compras' },
  { texto: 'Mi pedido', ruta: '/compras/resumen' },
]

function Navbar() {
  // Permite cambiar de sección al pulsar una opción.
  const navigate = useNavigate()
  // Lee la ruta actual para resaltar el botón correspondiente.
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
