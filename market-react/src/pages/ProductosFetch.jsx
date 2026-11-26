// ============================================================
// ProductosFetch.jsx — CONSUMO DE API CON FETCH
// Ruta: /catalogo (index de SectionCatalogo)
// API libre: FakeStoreAPI  -> https://fakestoreapi.com/products
//
// Hooks usados:
//  - useState  : guardar productos, estado de carga, error y búsqueda.
//  - useEffect : pedir los datos UNA sola vez al montar el componente.
//  - useCarritoStore (Zustand): agregar productos al carrito global.
// ============================================================
import { useState, useEffect } from 'react';

import { useCarritoStore } from '../store/useCarritoStore.js';
import { formatearPrecio } from '../utils/formato.js';

const URL_FAKESTORE = 'https://fakestoreapi.com/products';

function ProductosFetch() {
  // ---------- ESTADOS LOCALES ----------
  const [productos, setProductos] = useState([]); // datos de la API
  const [cargando, setCargando] = useState(true); // ¿está cargando?
  const [error, setError] = useState(null); // mensaje de error
  const [busqueda, setBusqueda] = useState(''); // texto del buscador

  // ---------- ESTADO GLOBAL (Zustand) ----------
  const agregarProducto = useCarritoStore((state) => state.agregarProducto);

  // ---------- EFECTO: PETICIÓN A LA API ----------
  // El arreglo vacío [] significa: "ejecútalo solo al montar".
  useEffect(() => {
    // AbortController permite CANCELAR la petición si el usuario
    // cambia de página antes de que lleguen los datos.
    const controlador = new AbortController();

    const cargarProductos = async () => {
      try {
        setCargando(true);

        // 1. Hacemos la petición
        const respuesta = await fetch(URL_FAKESTORE, {
          signal: controlador.signal,
        });

        // 2. fetch NO lanza error con 404/500: hay que revisarlo a mano
        if (!respuesta.ok) {
          throw new Error(`Error HTTP ${respuesta.status}`);
        }

        // 3. Convertimos el cuerpo de la respuesta a JSON
        const datos = await respuesta.json();

        // 4. NORMALIZAMOS: dejamos los datos con nuestros propios
        //    nombres en español. El prefijo "fs-" evita que el id
        //    choque con los productos de DummyJSON en el carrito.
        const normalizados = datos.map((p) => ({
          id: `fs-${p.id}`,
          titulo: p.title,
          precio: p.price,
          imagen: p.image,
          categoria: p.category,
        }));

        setProductos(normalizados);
        setError(null);
      } catch (err) {
        // Si fue una cancelación, no es un error real
        if (err.name !== 'AbortError') {
          setError('No se pudieron cargar los productos. ' + err.message);
        }
      } finally {
        // Solo apagamos el "cargando" si la petición no fue cancelada
        if (!controlador.signal.aborted) setCargando(false);
      }
    };

    cargarProductos();

    // FUNCIÓN DE LIMPIEZA: se ejecuta al desmontar el componente
    return () => controlador.abort();
  }, []);

  // ---------- FILTRO DEL BUSCADOR ----------
  // No necesita otro estado: se calcula en cada render.
  const productosFiltrados = productos.filter((p) =>
    p.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  // ---------- RENDER CONDICIONAL ----------
  if (cargando) {
    return (
      <div className="estado estado--cargando">
        <span className="spinner" aria-hidden="true"></span>
        Cargando productos con fetch...
      </div>
    );
  }

  if (error) {
    return <div className="estado estado--error">⚠️ {error}</div>;
  }

  return (
    <div>
      <div className="catalogo__barra">
        <h2 className="catalogo__titulo">
          FakeStoreAPI <span className="etiqueta">fetch</span>
        </h2>

        {/* Input CONTROLADO: su valor vive en el estado "busqueda" */}
        <input
          type="search"
          className="buscador"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {productosFiltrados.length === 0 ? (
        <p className="estado">No hay productos que coincidan con "{busqueda}".</p>
      ) : (
        <div className="grilla">
          {/* Pintamos cada producto directamente aquí (sin props) */}
          {productosFiltrados.map((producto) => (
            <article key={producto.id} className="tarjeta">
              <div className="tarjeta__imagen">
                <img src={producto.imagen} alt={producto.titulo} loading="lazy" />
              </div>
              <span className="tarjeta__categoria">{producto.categoria}</span>
              <h3 className="tarjeta__titulo">{producto.titulo}</h3>
              <p className="tarjeta__precio">{formatearPrecio(producto.precio)}</p>

              {/* Acción de Zustand: agregar al carrito global */}
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

export default ProductosFetch;
