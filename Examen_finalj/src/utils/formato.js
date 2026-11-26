const formateador = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'USD',
})

export function formatearPrecio(valor) {
  return formateador.format(valor)
}
