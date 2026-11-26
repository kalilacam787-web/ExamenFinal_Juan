// ============================================================
// ProductosAxios.jsx — CONSUMO DE API CON AXIOS
// Ruta: /catalogo/axios (hija de SectionCatalogo)
// API libre: DummyJSON -> https://dummyjson.com/products
//
// Diferencias de Axios frente a fetch:
//  - Convierte la respuesta a JSON automáticamente (res.data).
//  - Lanza error solo con códigos 4xx/5xx (no hay que revisar .ok).
//  - Permite una instancia con baseURL (ver services/apiDummy.js).
//
// Extra: un <select> de categorías con useState; cada vez que
// cambia, useEffect vuelve a pedir datos (dependencia [categoria]).
// ============================================================
import { useState, useEffect } from 'react';
import axios from 'axios';

import { apiDummy } from '../services/apiDummy.js';
import { useCarritoStore } from '../store/useCarritoStore.js';
import { formatearPrecio } from '../utils/formato.js';

// Algunas categorías que existen en DummyJSON
const CATEGORIAS = [
  { valor: 'todas', texto: 'Todas' },
  { valor: 'groceries', texto: 'Mercado' },
  { valor: 'beauty', texto: 'Belleza' },
  { valor: 'smartphones', texto: 'Celulares' },
  { valor: 'laptops', texto: 'Portátiles' },
  { valor: 'home-decoration', texto: 'Hogar' },
];

function ProductosAxios() {
  // ---------- ESTADOS LOCALES ----------
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [categoria, setCategoria] = useState('todas');

  // ---------- ESTADO GLOBAL (Zustand) ----------
  const agregarProducto = useCarritoStore((state) => state.agregarProducto);

  // ---------- EFECTO: se ejecuta al montar Y cada vez que
  //            cambie "categoria" ----------
  useEffect(() => {
    const controlador = new AbortController();

    const cargarProductos = async () => {
      try {
        setCargando(true);

        // Elegimos el endpoint según la categoría seleccionada
        const endpoint =
          categoria === 'todas'
            ? '/products?limit=24'
            : `/products/category/${categoria}`;

        // Axios: la respuesta ya viene convertida en "data"
        const respuesta = await apiDummy.get(endpoint, {
          signal: controlador.signal,
        });

        // DummyJSON responde { products: [...], total, skip, limit }
        const normalizados = respuesta.data.products.map((p) => ({
          id: `dj-${p.id}`, // prefijo para no chocar con FakeStore
          titulo: p.title,
          precio: p.price,
          imagen: p.thumbnail,
          categoria: p.category,
        }));

        setProductos(normalizados);
        setError(null);
      } catch (err) {
        // axios.isCancel detecta peticiones canceladas
        if (!axios.isCancel(err)) {
          setError('No se pudieron cargar los productos. ' + err.message);
        }
      } finally {
        if (!controlador.signal.aborted) setCargando(false);
      }
    };

    cargarProductos();

    // Limpieza: si la categoría cambia rápido, cancelamos la anterior
    return () => controlador.abort();
  }, [categoria]);

  return (
    <div>
      <div className="catalogo__barra">
        <h2 className="catalogo__titulo">
          DummyJSON <span className="etiqueta etiqueta--axios">Axios</span>
        </h2>

        {/* Select CONTROLADO: al cambiar, se dispara el useEffect */}
        <select
          className="buscador"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          aria-label="Filtrar por categoría"
        >
          {CATEGORIAS.map((c) => (
            <option key={c.valor} value={c.valor}>
              {c.texto}
            </option>
          ))}
        </select>
      </div>

      {/* Render condicional con operadores ternarios */}
      {cargando ? (
        <div className="estado estado--cargando">
          <span className="spinner" aria-hidden="true"></span>
          Cargando productos con Axios...
        </div>
      ) : error ? (
        <div className="estado estado--error">⚠️ {error}</div>
      ) : (
        <div className="grilla">
          {productos.map((producto) => (
            <article key={producto.id} className="tarjeta">
              <div className="tarjeta__imagen">
                <img src={producto.imagen} alt={producto.titulo} loading="lazy" />
              </div>
              <span className="tarjeta__categoria">{producto.categoria}</span>
              <h3 className="tarjeta__titulo">{producto.titulo}</h3>
              <p className="tarjeta__precio">{formatearPrecio(producto.precio)}</p>
              <button
                type="button"
                className="btn btn--primario"
                onClick={() => agregarProducto(producto)}
              >
                Agregar al carrito
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductosAxios;
