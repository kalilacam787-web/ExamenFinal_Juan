import { Link } from 'react-router-dom'

function NoEncontrado() {
  return (
    <section>
      <h2>404 · Página no encontrada</h2>
      <Link to="/">Volver al inicio</Link>
    </section>
  )
}

export default NoEncontrado
