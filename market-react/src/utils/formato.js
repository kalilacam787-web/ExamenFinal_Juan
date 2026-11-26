// ============================================================
// formato.js — FUNCIONES DE AYUDA
// Las APIs de prueba devuelven precios en dólares (USD).
// Intl.NumberFormat les da formato de moneda (ej: US$ 109,95).
// ============================================================
const formateador = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'USD',
});

export const formatearPrecio = (valor) => formateador.format(valor);
