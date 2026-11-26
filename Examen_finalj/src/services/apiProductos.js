const URL_PRODUCTOS = 'https://dummyjson.com/products/category/groceries?limit=30'

export async function obtenerProductos({ signal } = {}) {
  const respuesta = await fetch(URL_PRODUCTOS, { signal })

  if (!respuesta.ok) {
    throw new Error(`Error HTTP ${respuesta.status}`)
  }

  const datos = await respuesta.json()

  if (!Array.isArray(datos.products)) {
    throw new Error('El servicio devolvió una lista de productos inválida.')
  }

  return datos.products.map((producto) => ({
    id: `dummy-${producto.id}`,
    titulo: producto.title,
    precio: producto.price,
    imagen: producto.thumbnail ?? producto.images?.[0] ?? '',
    categoria: producto.category,
  }))
}
