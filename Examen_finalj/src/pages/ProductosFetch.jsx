import { useEffect, useState } from 'react'

import { obtenerProductos } from '../services/apiProductos.js'
import { useCarritoStore } from '../store/useCarritoStore.js'
import { formatearPrecio } from '../utils/formato.js'

function ProductosFetch() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const agregarProducto = useCarritoStore((state) => state.agregarProducto)

  useEffect(() => {
    const controlador = new AbortController()

    async function cargarProductos() {
      try {
        const resultado = await obtenerProductos({ signal: controlador.signal })
        setProductos(resultado)
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
  }, [])

  if (cargando) return <p role="status">Cargando productos del mercado...</p>
  if (error) return <p role="alert">{error}</p>
  if (productos.length === 0) return <p>No hay productos disponibles.</p>

  return (
    <div>
      <p>Precios de demostración en USD, recibidos desde DummyJSON.</p>
      <div>
        {productos.map((producto) => (
          <article key={producto.id}>
            {producto.imagen && (
              <img src={producto.imagen} alt={producto.titulo} loading="lazy" />
            )}
            <p>{producto.categoria}</p>
            <h3>{producto.titulo}</h3>
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

export default ProductosFetch
