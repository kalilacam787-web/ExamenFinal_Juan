import { useEffect, useState } from 'react'

import { apiDummy } from '../services/apiDummy.js'
import { useCarritoStore } from '../store/useCarritoStore.js'
import { formatearPrecio } from '../utils/formato.js'

function ProductosAxios() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const agregarProducto = useCarritoStore((state) => state.agregarProducto)

  useEffect(() => {
    const controlador = new AbortController()

    async function cargarProductos() {
      try {
        const respuesta = await apiDummy.get('/products/category/groceries?limit=30', {
          signal: controlador.signal,
        })

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
  }, [])

  if (cargando) return <p role="status">Cargando productos con Axios...</p>
  if (error) return <p role="alert">{error}</p>
  if (productos.length === 0) return <p>No hay productos disponibles.</p>

  return (
    <div>
      <h3>Productos de mercado</h3>
      <div className="catalogo__grilla">
        {productos.map((producto) => (
          <article key={producto.id} className="producto">
            {producto.imagen && (
              <img src={producto.imagen} alt={producto.titulo} loading="lazy" />
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
    </div>
  )
}

export default ProductosAxios
