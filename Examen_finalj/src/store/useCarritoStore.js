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
}))
