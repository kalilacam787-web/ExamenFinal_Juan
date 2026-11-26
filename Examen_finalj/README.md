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
- `/catalogo/axios`: productos de mercado de DummyJSON cargados con Axios
- `/compras`: canasta con controles para aumentar, disminuir y quitar productos
- `/compras/resumen`: cantidades y total de la canasta

El estado de la canasta se administra con Zustand y permanece en memoria mientras
la aplicación está abierta. Ambas APIs entregan precios de demostración que se
muestran en USD; no representan los precios de una tienda real.

Los estilos visuales se desarrollarán después con CSS puro, sin Bootstrap ni
Tailwind.
