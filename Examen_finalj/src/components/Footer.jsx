function Footer() {
  const anio = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>Aprendiz: Kamila Camilo</p>
      <p>Ficha: 3223898</p>
      <p>Año: {anio}</p>
      <p>
        APIs:{' '}
        <a href="https://dummyjson.com" target="_blank" rel="noreferrer">
          DummyJSON
        </a>
        {' · '}
        <a href="https://fakestoreapi.com" target="_blank" rel="noreferrer">
          FakeStoreAPI
        </a>
      </p>
    </footer>
  )
}

export default Footer
