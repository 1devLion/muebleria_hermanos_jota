// Lógica de la página del catálogo de productos.
import { products } from '../data/products.js';
import { createProductCard } from '../components/productCard.js';

// Carga simulada de los productos del catálogo (petición asíncrona simulada).
function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 600);
  });
}

// Renderiza el estado de "cargando" dentro de la grilla.
function showLoadingState(container) {
  const mensaje = document.createElement('p');
  mensaje.classList.add('product-loading');
  mensaje.textContent = 'Cargando productos...';
  container.appendChild(mensaje);
}

// Renderiza un mensaje cuando no hay productos que mostrar.
function showEmptyState(container, message) {
  const mensaje = document.createElement('p');
  mensaje.classList.add('product-empty');
  mensaje.textContent = message;
  container.appendChild(mensaje);
}

// Renderiza una lista de productos dentro de la grilla.
function renderProducts(container, lista) {
  container.innerHTML = '';

  if (lista.length === 0) {
    showEmptyState(container, 'No encontramos productos con ese nombre.');
    return;
  }

  lista.forEach((producto) => {
    container.appendChild(createProductCard(producto));
  });
}

// Filtra los productos por nombre según el texto del buscador.
function filterProducts(term) {
  const trimmed = term.trim().toLowerCase();
  if (!trimmed) return products;

  return products.filter((producto) =>
    producto.name.toLowerCase().includes(trimmed)
  );
}

async function initCatalogPage() {
  const grid = document.querySelector('.product-grid');
  const searchInput = document.querySelector('.product-search');
  if (!grid) return;

  showLoadingState(grid);

  const catalogo = await fetchProducts();

  // El buscador filtra sobre los productos ya cargados.
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderProducts(grid, filterProducts(searchInput.value));
    });
  }

  renderProducts(grid, catalogo);
}

document.addEventListener('DOMContentLoaded', initCatalogPage);
