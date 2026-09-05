// Lógica de la página del catálogo de productos.
import { products } from '../data/products.js';
import { createProductCard } from '../components/productCard.js';

// Renderiza todos los productos del catálogo en la grilla.
function renderAllProducts(container) {
  products.forEach((producto) => {
    container.appendChild(createProductCard(producto));
  });
}

function initCatalogPage() {
  const grid = document.querySelector('.product-grid');
  if (!grid) return;

  renderAllProducts(grid);
}

document.addEventListener('DOMContentLoaded', initCatalogPage);
