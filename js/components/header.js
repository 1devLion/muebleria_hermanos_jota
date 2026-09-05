import { obtenerCantidadCarrito } from '../cart.js';

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
        <a href="#" class="cart-widget" aria-label="Ver carrito">
          🛒 <span id="cart-counter" class="cart-counter">0</span>
        </a>
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

  return container;
}
