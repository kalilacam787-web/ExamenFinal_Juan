/*
 * Consulta FakeStoreAPI con Fetch, permite buscar por nombre y agregar productos.
 */
import { useEffect, useState } from 'react'

import { useCarritoStore } from '../store/useCarritoStore.js'
import { formatearPrecio } from '../utils/formato.js'

const URL_FAKESTORE = 'https://fakestoreapi.com/products'

function ProductosFetch() {

  // Esto guarda la lista recibida de FakeStoreAPI.
  const [productos, setProductos] = useState([])
  // Esto indica si la consulta inicial sigue en curso.
  const [cargando, setCargando] = useState(true)
  // Conserva el mensaje que se muestra si llega a fallar la consulta.
  const [error, setError] = useState('')
  // Permite repetir la consulta cuando el usuario solicita un reintento.
  const [intento, setIntento] = useState(0)
  // Controla el texto usado para filtrar los productos.
  const [busqueda, setBusqueda] = useState('')
  // Usa la acción global para guardar un producto en la canasta.
  const agregarProducto = useCarritoStore((state) => state.agregarProducto)

  // Esto permite cargar el catálogo al entrar y cancela la petición al salir de la página.
  useEffect(() => {
    const controlador = new AbortController()

    async function cargarProductos() {
      try {
        setCargando(true)
        const respuesta = await fetch(URL_FAKESTORE, {
          signal: controlador.signal,
        })

        if (!respuesta.ok) {
          throw new Error(`Error HTTP ${respuesta.status}`)
        }

        const datos = await respuesta.json()

        if (!Array.isArray(datos)) {
          throw new Error('El servicio devolvió una lista inválida.')
        }

        setProductos(
          datos.map((producto) => ({
            id: `fs-${producto.id}`,
            titulo: producto.title,
            precio: producto.price,
            imagen: producto.image,
            categoria: producto.category,
          })),
        )
        setError('')
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(`No se pudieron cargar los productos: ${err.message}`)
        }
      } finally {
        if (!controlador.signal.aborted) setCargando(false)
      }
    }

    cargarProductos()
    return () => controlador.abort()
  }, [intento])

  const productosFiltrados = productos.filter((producto) =>
    producto.titulo.toLowerCase().includes(busqueda.toLowerCase()),
  )

  if (cargando) return <p role="status">Cargando productos de FakeStoreAPI...</p>
  if (error) {
    return (
      <div>
        <p role="alert">{error}</p>
        <button type="button" onClick={() => setIntento((actual) => actual + 1)}>
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="catalogo__barra">
        <h3>Productos de FakeStoreAPI</h3>
        <input
          type="search"
          className="catalogo__buscador"
          placeholder="Buscar producto..."
          aria-label="Buscar producto por nombre"
          value={busqueda}
          onChange={(event) => setBusqueda(event.target.value)}
        />
      </div>

      {productosFiltrados.length === 0 ? (
        <p>No hay productos que coincidan con “{busqueda}”.</p>
      ) : (
        <div className="catalogo__grilla">
          {productosFiltrados.map((producto) => (
            <article key={producto.id} className="producto">
              <img src={producto.imagen} alt={producto.titulo} loading="lazy" />
              <p>{producto.categoria}</p>
              <h4>{producto.titulo}</h4>
              <p>{formatearPrecio(producto.precio)}</p>
              <button
                type="button"
                onClick={() => agregarProducto(producto)}
              >
                Agregar a la canasta
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductosFetch
