/*
 * Consulta DummyJSON con Axios y vuelve a cargar los productos al cambiar categoría.
 */
import { useEffect, useState } from 'react'

import { apiDummy } from '../services/apiDummy.js'
import { useCarritoStore } from '../store/useCarritoStore.js'
import { formatearPrecio } from '../utils/formato.js'

const CATEGORIAS = [
  { valor: 'todas', texto: 'Todas' },
  { valor: 'groceries', texto: 'Mercado' },
  { valor: 'beauty', texto: 'Belleza' },
  { valor: 'smartphones', texto: 'Celulares' },
  { valor: 'laptops', texto: 'Portátiles' },
  { valor: 'home-decoration', texto: 'Hogar' },
]

function ProductosAxios() {
  // Guarda los productos recibidos para mostrarlos en la vitrina.
  const [productos, setProductos] = useState([])
  // Indica si la consulta para la categoría seleccionada está en curso.
  const [cargando, setCargando] = useState(true)
  // Conserva el mensaje que se muestra si falla la consulta.
  const [error, setError] = useState('')
  // Define qué categoría se consulta; "todas" muestra el catálogo general.
  const [categoria, setCategoria] = useState('todas')
  // Controla el texto que filtra los productos por nombre.
  const [busqueda, setBusqueda] = useState('')
  // Usa la acción global para guardar un producto en la canasta.
  const agregarProducto = useCarritoStore((state) => state.agregarProducto)

  // Consulta de nuevo cuando cambia la categoría y cancela la petición anterior.
  useEffect(() => {
    const controlador = new AbortController()

    async function cargarProductos() {
      try {
        setCargando(true)
        setError('')
        const endpoint =
          categoria === 'todas'
            ? '/products?limit=24'
            : `/products/category/${categoria}`
        const respuesta = await apiDummy.get(endpoint, {
          signal: controlador.signal,
        })

        if (!Array.isArray(respuesta.data.products)) {
          throw new Error('El servicio devolvió una lista inválida.')
        }

        setProductos(
          respuesta.data.products.map((producto) => ({
            id: `dj-${producto.id}`,
            titulo: producto.title,
            precio: producto.price,
            imagen: producto.thumbnail ?? producto.images?.[0] ?? '',
            categoria: producto.category,
          })),
        )
        setError('')
      } catch (err) {
        if (!controlador.signal.aborted) {
          setError(`No se pudieron cargar los productos: ${err.message}`)
        }
      } finally {
        if (!controlador.signal.aborted) setCargando(false)
      }
    }

    cargarProductos()
    return () => controlador.abort()
  }, [categoria])

  const productosFiltrados = productos.filter((producto) =>
    producto.titulo.toLowerCase().includes(busqueda.trim().toLowerCase()),
  )

  return (
    <div>
      <div className="catalogo__barra">
        <h3>Productos de DummyJSON</h3>
        <input
          type="search"
          className="catalogo__buscador"
          placeholder="Buscar producto..."
          aria-label="Buscar producto por nombre"
          value={busqueda}
          onChange={(event) => setBusqueda(event.target.value)}
        />
        <select
          className="catalogo__selector"
          value={categoria}
          onChange={(event) => setCategoria(event.target.value)}
          aria-label="Filtrar por categoría"
        >
          {CATEGORIAS.map((opcion) => (
            <option key={opcion.valor} value={opcion.valor}>
              {opcion.texto}
            </option>
          ))}
        </select>
      </div>

      {cargando ? (
        <p role="status">Cargando productos con Axios...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : productosFiltrados.length === 0 ? (
        <p>No hay productos que coincidan con “{busqueda}”.</p>
      ) : (
        <div className="catalogo__grilla">
          {productosFiltrados.map((producto) => (
            <article key={producto.id} className="producto">
              {producto.imagen && (
                <img
                  src={producto.imagen}
                  alt={producto.titulo}
                  loading="lazy"
                />
              )}
              <p>{producto.categoria}</p>
              <h4>{producto.titulo}</h4>
              <p>{formatearPrecio(producto.precio)}</p>
              <button type="button" onClick={() => agregarProducto(producto)}>
                Agregar a la canasta
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductosAxios
