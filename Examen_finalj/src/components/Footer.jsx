function Footer() {
  const anio = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>Aprendiz: Kamila Camilo</p>
      <p>Ficha: 3223898</p>
      <p>Año: {anio}</p>
      <p>
        API:{' '}
        <a href="https://dummyjson.com" target="_blank" rel="noreferrer">
          DummyJSON
        </a>
      </p>
    </footer>
  )
}

export default Footer
