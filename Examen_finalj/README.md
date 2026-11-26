# Mercado Popayán

Vitrina de productos de mercado y canasta de compras construida con React, Vite,
React Router y Zustand. El catálogo incluye productos de [FakeStoreAPI](https://fakestoreapi.com)
cargados con Fetch y productos de mercado de [DummyJSON](https://dummyjson.com)
cargados con Axios.

## Ejecutar el proyecto

Desde la raíz del repositorio:

```powershell
cd Examen_finalj
npm install
npm run dev
```

## Rutas

- `/`: inicio
- `/catalogo`: productos de FakeStoreAPI cargados con Fetch y buscador por nombre
- `/catalogo/axios`: productos de DummyJSON cargados con Axios y filtro por categoría
- `/compras`: canasta con controles de cantidad, subtotal y acceso al resumen
- `/compras/resumen`: unidades, subtotal, envío de ejemplo y total del pedido

El estado de la canasta se administra con Zustand y permanece guardado en el
almacenamiento local del navegador entre visitas. Ambas APIs entregan precios de
demostración que se muestran en USD; no representan los precios de una tienda real.

Los estilos se implementan con CSS puro, sin Bootstrap ni Tailwind.
