import { obtenerCantidadCarrito } from '../cart.js';
import { renderCartPreview, toggleCartPreview } from './cartPreview.js';

export function renderHeader() {
  const container = document.getElementById('header') || document.createElement('div');
  container.id = 'header';

  container.innerHTML = `
    <header>
      <a href="index.html"><img class="logo" src="img/ui/logo.svg" alt="Logo de la empresa" /></a>
      <nav>
        <a href="index.html">Inicio</a>
        <a href="productos.html">Productos</a>
        <a href="contacto.html">Contacto</a>
        <div class="cart-widget-container">
        <button type="button" class="cart-widget" id="cart-toggle" aria-label="Ver carrito">
    🛒 <span id="cart-counter" class="cart-counter">0</span>
       </button>
        </div>
      </nav>
    </header>
  `;

  if (!container.parentElement) {
    document.body.prepend(container);
  }

  const counter = container.querySelector('#cart-counter');
  if (counter) {
    counter.textContent = obtenerCantidadCarrito();
  }

  renderCartPreview();
  container.querySelector('#cart-toggle').addEventListener('click', (event) => {
    event.stopPropagation();
    toggleCartPreview();
  });
  return container;
}

// Cada vez que algo agrega un producto al carrito (desde cualquier página),
// cart.js emite 'cart:updated' y acá se escucha para actualizar el contador.
window.addEventListener('cart:updated', () => {
  const counter = document.querySelector('#cart-counter');
  if (counter) {
    counter.textContent = obtenerCantidadCarrito();
  }
});
