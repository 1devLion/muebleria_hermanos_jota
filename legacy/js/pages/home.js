// Lógica de la página de inicio.
import { products } from '../data/products.js';
import { createProductCard } from '../components/productCard.js';
import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';

// Carga simulada de los productos destacados (petición asíncrona simulada).
function fetchFeaturedProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.slice(0, 3));
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

// Renderiza una selección de productos destacados en la grilla del home.
function renderFeaturedProducts(container, destacados) {
  container.innerHTML = '';

  destacados.forEach((producto) => {
    container.appendChild(createProductCard(producto));
  });
}

async function initHomePage() {
  const grid = document.querySelector('.product-grid');
  if (!grid) return;

  showLoadingState(grid);

  const destacados = await fetchFeaturedProducts();
  renderFeaturedProducts(grid, destacados);
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  initHomePage();
});
