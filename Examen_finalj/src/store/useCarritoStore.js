/*
 * Guarda la canasta en Zustand y en el navegador para conservar los cambios al recargar.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCarritoStore = create(
  persist(
    (set) => ({
      productos: [],

      // Agrega el producto o aumenta su cantidad si ya estaba en la canasta.
      agregarProducto: (producto) =>
        set((state) => {
          const existe = state.productos.some((item) => item.id === producto.id)

          if (existe) {
            return {
              productos: state.productos.map((item) =>
                item.id === producto.id
                  ? { ...item, cantidad: item.cantidad + 1 }
                  : item,
              ),
            }
          }

          return {
            productos: [...state.productos, { ...producto, cantidad: 1 }],
          }
        }),

      // Suma una unidad al producto indicado.
      sumarCantidad: (id) =>
        set((state) => ({
          productos: state.productos.map((producto) =>
            producto.id === id
              ? { ...producto, cantidad: producto.cantidad + 1 }
              : producto,
          ),
        })),

      // Resta una unidad y quita el producto si su cantidad llega a cero.
      restarCantidad: (id) =>
        set((state) => ({
          productos: state.productos
            .map((producto) =>
              producto.id === id
                ? { ...producto, cantidad: producto.cantidad - 1 }
                : producto,
            )
            .filter((producto) => producto.cantidad > 0),
        })),

      // Elimina de la canasta el producto indicado.
      eliminarProducto: (id) =>
        set((state) => ({
          productos: state.productos.filter((producto) => producto.id !== id),
        })),

      // Deja la canasta vacía.
      vaciarCarrito: () => set({ productos: [] }),
    }),
    { name: 'mercacauca-canasta' },
  ),
)
