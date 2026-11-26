# 🛒 Taller: Market SENA con React + Vite

**Programa:** ADSO (Análisis y Desarrollo de Software)
**Duración sugerida:** 4 sesiones de 3 horas
**Modalidad:** grupos de 2 o 3 aprendices

---

## 1. Objetivo

Construir una tienda en línea (Market) en React con Vite que integre:

| Tema | Dónde se ve |
|---|---|
| Componentes estáticos | `Header`, `Navbar`, `Footer`, `Layout` |
| `useNavigate` | Los 4 botones del `Navbar` (también Header, Inicio, Carrito) |
| Rutas anidadas y `<Outlet/>` | `SectionCatalogo` y `SectionCompras` |
| Imágenes | Banners en `src/assets` + imágenes de productos de las APIs |
| `useState` y `useEffect` | `ProductosFetch`, `ProductosAxios`, `Resumen`, `Header` |
| API con **fetch** | `ProductosFetch` → FakeStoreAPI |
| API con **Axios** | `ProductosAxios` → DummyJSON |
| Estado global con **Zustand** | `store/useCarritoStore.js` (agregar, sumar, restar, eliminar, vaciar) |
| CSS puro con hexadecimales | `src/index.css` |

> **Regla del taller:** nuestros componentes **no reciben props ni `children`**.
> Toda la información compartida (el carrito) vive en **Zustand**, y el contenido
> que cambia lo pinta **`<Outlet/>`**. Las únicas "props" que aparecen son las
> que exige la librería (`element`, `to`, `path`) y atributos HTML (`src`, `alt`, `onClick`).

---

## 2. Requisitos previos

- Node.js 20 o superior (`node -v`)
- Visual Studio Code
- Conocer: funciones flecha, `map`, `filter`, `reduce`, `async/await`, desestructuración

---

## 3. Crear el proyecto desde cero (paso a paso)

```bash
# 1. Crear el proyecto con la plantilla de React
npm create vite@latest market-react -- --template react

# 2. Entrar a la carpeta
cd market-react

# 3. Instalar dependencias base
npm install

# 4. Instalar las librerías del taller
npm install react-router-dom axios zustand

# 5. Levantar el servidor de desarrollo
npm run dev
```

Abrir `http://localhost:5173`.

> Si usas el proyecto de este .zip: solo ejecuta `npm install` y luego `npm run dev`.

---

## 4. Estructura de carpetas

```
market-react/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                 ← Punto de entrada + BrowserRouter
    ├── App.jsx                  ← Mapa de rutas
    ├── index.css                ← CSS puro (hexadecimales)
    ├── assets/                  ← Imágenes (logo y banners)
    ├── layouts/
    │   └── Layout.jsx           ← Header + Navbar + <Outlet/> + Footer
    ├── components/              ← Componentes ESTÁTICOS
    │   ├── Header.jsx
    │   ├── Navbar.jsx           ← 4 botones con useNavigate
    │   └── Footer.jsx
    ├── sections/                ← Las 2 Sections (con <Outlet/>)
    │   ├── SectionCatalogo.jsx
    │   └── SectionCompras.jsx
    ├── pages/                   ← Vistas que van dentro de los Outlet
    │   ├── Inicio.jsx
    │   ├── ProductosFetch.jsx   ← fetch + useState + useEffect
    │   ├── ProductosAxios.jsx   ← Axios + useState + useEffect
    │   ├── Carrito.jsx          ← Zustand
    │   ├── Resumen.jsx          ← Zustand + useEffect (temporizador)
    │   └── NoEncontrado.jsx     ← 404
    ├── store/
    │   └── useCarritoStore.js   ← Estado global con Zustand
    ├── services/
    │   └── apiDummy.js          ← Instancia de Axios
    └── utils/
        └── formato.js           ← Formato de precios
```

---

## 5. Mapa de rutas

```
/                       Layout
├── (index)             Inicio
├── /catalogo           SectionCatalogo  ── <Outlet/>
│   ├── (index)         ProductosFetch     (fetch → FakeStoreAPI)
│   └── /catalogo/axios ProductosAxios     (Axios → DummyJSON)
├── /compras            SectionCompras   ── <Outlet/>
│   ├── (index)         Carrito            (Zustand)
│   └── /compras/resumen Resumen           (Zustand)
└── *                   NoEncontrado
```

**Botones del Navbar (useNavigate):**

| Botón | Ruta |
|---|---|
| 🏠 Inicio | `/` |
| 🛍️ Catálogo | `/catalogo` |
| 🛒 Carrito | `/compras` |
| 🧾 Resumen | `/compras/resumen` |

Dentro de cada Section, unas **pestañas con `<NavLink>`** llevan a las rutas hijas.

---

## 6. APIs libres utilizadas (sin registro ni token)

| API | Endpoint | Se consume con |
|---|---|---|
| FakeStoreAPI | `https://fakestoreapi.com/products` | `fetch` |
| DummyJSON | `https://dummyjson.com/products?limit=24` | `axios` |
| DummyJSON (categoría) | `https://dummyjson.com/products/category/groceries` | `axios` |

### fetch vs Axios

| | fetch | Axios |
|---|---|---|
| Instalación | Nativo del navegador | `npm install axios` |
| Convertir a JSON | `await res.json()` | Automático: `res.data` |
| Errores 404/500 | Hay que revisar `res.ok` | Lanza error solo |
| URL base reutilizable | No | `axios.create({ baseURL })` |
| Cancelar petición | `AbortController` | `AbortController` + `axios.isCancel()` |

### Normalización de datos
Las dos APIs nombran distinto sus campos (`image` vs `thumbnail`). Por eso
convertimos todo al mismo formato antes de guardarlo:

```js
{ id: 'fs-1', titulo, precio, imagen, categoria }
```

El prefijo `fs-` / `dj-` evita que dos productos con `id: 1` se mezclen en el carrito.

---

## 7. Zustand: el carrito

```js
const productos = useCarritoStore((state) => state.productos);
const agregarProducto = useCarritoStore((state) => state.agregarProducto);
```

| Acción | Qué hace |
|---|---|
| `agregarProducto(producto)` | Si no existe lo agrega con cantidad 1; si existe, suma 1 |
| `sumarCantidad(id)` | +1 unidad |
| `restarCantidad(id)` | −1 unidad (si llega a 0, sale del carrito) |
| `eliminarProducto(id)` | Quita el producto completo |
| `vaciarCarrito()` | Deja el carrito vacío |

**¿Por qué no props?** El carrito se usa en `Header`, `SectionCompras`, `Carrito`,
`Resumen` y en los dos catálogos. Pasarlo por props obligaría a enviarlo de padre
a hijo por varios niveles (*prop drilling*). Zustand lo vuelve accesible desde
cualquier componente.

---

## 8. Estados visuales en CSS puro

| Estado | Selector | Ejemplo |
|---|---|---|
| Pasar el mouse | `:hover` | Tarjeta que se eleva |
| Presionado | `:active` | Botón que se encoge |
| Teclado (Tab) | `:focus-visible` | Contorno ámbar `#FBBF24` |
| Deshabilitado | `:disabled` | Botones de Resumen con carrito vacío |
| Ruta activa (Navbar) | `.navbar__btn--activo` | Clase puesta con `useLocation` |
| Ruta activa (pestañas) | `.pestanas__item.active` | Clase que agrega `NavLink` |
| Interfaz | `.estado--cargando`, `--error`, `--vacio`, `--exito` | Spinner, error, carrito vacío |

---

## 9. Plan de sesiones

| Sesión | Contenido | Entregable |
|---|---|---|
| 1 | Vite, estructura, Header/Navbar/Footer, CSS base | Layout estático |
| 2 | React Router: rutas, `useNavigate`, Sections con `<Outlet/>` y `NavLink` | Navegación completa |
| 3 | `useState` + `useEffect`: catálogo con fetch y con Axios | Productos desde APIs |
| 4 | Zustand: carrito y resumen | Market funcionando |

---

## 10. Retos para los aprendices

1. **Persistencia:** que el carrito no se borre al recargar usando el middleware `persist` de Zustand.
2. **Detalle de producto:** crear la ruta `/catalogo/producto/:id` y leer el id con `useParams`.
3. **Buscador en Axios:** usar `https://dummyjson.com/products/search?q=texto`.
4. **Pesos colombianos:** convertir los precios de USD a COP con una tasa fija.
5. **Stock:** no permitir sumar más unidades que el campo `stock` de DummyJSON.

---

## 11. Lista de chequeo (evaluación)

- [ ] El proyecto se creó con Vite y corre con `npm run dev`
- [ ] Header, Navbar y Footer son estáticos y siempre visibles
- [ ] El Navbar tiene 4 botones que navegan con `useNavigate`
- [ ] Hay 2 Sections, cada una con imagen, pestañas y `<Outlet/>`
- [ ] Un catálogo consume la API con `fetch` y otro con `axios`
- [ ] Se manejan los estados cargando / error con `useState`
- [ ] `useEffect` tiene arreglo de dependencias y función de limpieza
- [ ] El carrito con Zustand permite agregar, sumar, restar y eliminar
- [ ] Los componentes propios no usan props ni `children`
- [ ] El CSS es puro, con colores hexadecimales y estados `:hover`, `:active`, `:disabled`, `:focus-visible`
- [ ] Existe la página 404
