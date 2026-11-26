# Mercado Popayán

Vitrina de productos de mercado y canasta de compras construida con React, Vite,
React Router y Zustand. La vitrina consume productos de demostración de la
categoría `groceries` de [DummyJSON](https://dummyjson.com).

## Ejecutar el proyecto

Desde la raíz del repositorio:

```powershell
cd Examen_finalj
npm install
npm run dev
```

## Rutas

- `/`: inicio
- `/catalogo`: vitrina cargada desde el servicio externo
- `/compras`: canasta con controles para aumentar, disminuir y quitar productos
- `/compras/resumen`: cantidades y total de la canasta

El estado de la canasta se administra con Zustand y permanece en memoria mientras
la aplicación está abierta. DummyJSON entrega precios de demostración que se
muestran en USD; no representan los precios de una tienda real.

Los estilos visuales se desarrollarán después con CSS puro, sin Bootstrap ni
Tailwind.
