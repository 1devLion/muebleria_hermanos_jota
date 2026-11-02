import { API_URL } from '../config.js';

const BASE_URL = `${API_URL}/api/productos`;

// Sends the request and returns the parsed JSON. The backend responds with the
// JSON directly (array or object) and errors as { mensaje: "..." }.
// If the response is not ok, throws an Error carrying that message.
const request = async (url, options) => {
  let res;
  try {
    res = await fetch(url, options);
  } catch {
    throw new Error('No se pudo conectar con el servidor');
  }

  // An error response may not have a JSON body (e.g. a 500 from a proxy).
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.mensaje || `Error ${res.status} del servidor`);
  }

  return data;
};

const withBody = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
});

export const getProducts = () => request(BASE_URL);

export const getProductById = (id) => request(`${BASE_URL}/${encodeURIComponent(id)}`);

export const createProduct = (product) => request(BASE_URL, withBody('POST', product));

export const updateProduct = (id, product) =>
  request(`${BASE_URL}/${encodeURIComponent(id)}`, withBody('PUT', product));

export const deleteProduct = (id) =>
  request(`${BASE_URL}/${encodeURIComponent(id)}`, { method: 'DELETE' });
