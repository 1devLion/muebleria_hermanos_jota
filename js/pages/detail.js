// Lógica de la página de detalle de producto.
import { products } from '../data/products.js';
import { finishes } from '../data/finishes.js';
import { warrantyProgram } from '../data/warrantyProgram.js';
import { addToCart } from '../cart.js';

// Lee el id del producto desde la URL.
function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Muestra un mensaje cuando no se encuentra el producto.
function renderProductNotFound(container) {
  container.innerHTML = `
    <p class="texto-cuerpo">
      No encontramos ese producto. Volvé al <a href="productos.html">catálogo</a>.
    </p>
  `;
}

// Busca el acabado del producto y devuelve su HTML.
function renderFinish(finishId) {
  const finish = finishes.find((f) => f.id === finishId);
  if (!finish) return '';

  return `
    <div class="detalle-acabado">
      <h3 class="titulo-principal">Acabado: ${finish.name}</h3>
      <p class="texto-cuerpo"><strong>Composición:</strong> ${finish.composition}</p>
      <p class="texto-cuerpo"><strong>Aplicación:</strong> ${finish.application}</p>
    </div>
  `;
}

// Devuelve el HTML con los beneficios de la garantía.
function renderWarranty() {
  const benefitsHtml = warrantyProgram.benefits
    .map((benefit) => `<li class="texto-cuerpo"><strong>${benefit.name}:</strong> ${benefit.description}</li>`)
    .join('');

  return `
    <div class="detalle-garantia">
      <h3 class="titulo-principal">${warrantyProgram.name}</h3>
      <ul>${benefitsHtml}</ul>
    </div>
  `;
}

// Renderiza el producto completo y conecta el botón del carrito.
function renderProduct(product, container) {
  const formattedPrice = product.price.toLocaleString('es-AR');

  container.innerHTML = `
    <article class="detalle-producto">
      <img src="${product.image}" alt="${product.name}" class="detalle-imagen">
      <div class="detalle-info">
        <h1 class="titulo-principal">${product.name}</h1>
        <p class="leyenda">${product.size}</p>
        <p class="texto-cuerpo">${product.description}</p>
        <p class="texto-cuerpo"><strong>Materiales:</strong> ${product.materials}</p>
        <p class="titulo-principal detalle-precio">$${formattedPrice}</p>
        ${renderFinish(product.finish)}
        ${renderWarranty()}
        <button class="btn-texto" id="btn-agregar-carrito" type="button">
          Añadir al Carrito
        </button>
      </div>
    </article>
  `;

  const addToCartButton = container.querySelector('#btn-agregar-carrito');
  addToCartButton.addEventListener('click', () => {
    addToCart(product);
  });
}

// Inicializa la página de detalle de producto.
function initDetailPage() {
  const container = document.querySelector('#detalle-producto-container');
  if (!container) return;

  const productId = getProductIdFromUrl();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    renderProductNotFound(container);
    return;
  }

  renderProduct(product, container);
}

document.addEventListener('DOMContentLoaded', initDetailPage);
