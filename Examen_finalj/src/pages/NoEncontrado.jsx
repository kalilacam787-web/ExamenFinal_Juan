import { Link } from 'react-router-dom'

function NoEncontrado() {
  return (
    <section className="no-encontrado">
      <p className="no-encontrado__codigo">404</p>
      <h2>Página no encontrada</h2>
      <p>La página que buscas no existe o fue movida.</p>
      <Link to="/" className="no-encontrado__boton">
        Volver al inicio
      </Link>
    </section>
  )
}

export default NoEncontrado
