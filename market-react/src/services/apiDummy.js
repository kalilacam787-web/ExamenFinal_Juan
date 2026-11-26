// ============================================================
// apiDummy.js — INSTANCIA DE AXIOS
// axios.create() crea un "cliente" con configuración reutilizable:
// así no repetimos la URL base en cada petición.
//
// API libre usada: DummyJSON (https://dummyjson.com) — no requiere
// registro ni token.
// ============================================================
import axios from 'axios';

export const apiDummy = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000, // si tarda más de 10 s, Axios lanza un error
});
