import { create } from 'zustand'

export const useCarritoStore = create((set) => ({
  productos: [],

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

  sumarCantidad: (id) =>
    set((state) => ({
      productos: state.productos.map((producto) =>
        producto.id === id
          ? { ...producto, cantidad: producto.cantidad + 1 }
          : producto,
      ),
    })),

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

  eliminarProducto: (id) =>
    set((state) => ({
      productos: state.productos.filter((producto) => producto.id !== id),
    })),

  vaciarCarrito: () => set({ productos: [] }),
}))
