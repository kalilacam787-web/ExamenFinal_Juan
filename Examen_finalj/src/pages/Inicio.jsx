/*
 * Da la bienvenida y ofrece un acceso directo a la vitrina de productos.
 */
import { Link } from 'react-router-dom'

function Inicio() {
  return (
    <section>
      <h2>Bienvenido al mercado de Popayán</h2>
      <p>Consulta la vitrina, agrega productos a tu canasta y ajusta las cantidades.</p>
      <Link to="/catalogo">Explorar productos</Link>
    </section>
  )
}

export default Inicio
