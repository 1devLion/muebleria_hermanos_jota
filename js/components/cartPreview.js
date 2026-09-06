import {
  obtenerCarrito,
  obtenerTotalCarrito,
  incrementarCantidad,
  decrementarCantidad,
  eliminarDelCarrito,
  vaciarCarrito,
} from '../cart.js';

let isOpen = false;

function renderContenido() {
  const carrito = obtenerCarrito();

  if (carrito.length === 0) {
    return `<p class="cart-preview-empty">Tu carrito está vacío.</p>`;
  }

  const items = carrito
    .map((item) => {
      const subtotal = item.producto.price * item.cantidad;
      return `
        <li class="cart-preview-item" data-id="${item.producto.id}">
          <img src="${item.producto.image}" alt="${item.producto.name}" class="cart-preview-image">
          <div class="cart-preview-info">
            <p class="cart-preview-name">${item.producto.name}</p>
            <p class="cart-preview-subtotal">$${subtotal.toLocaleString('es-AR')}</p>
            <div class="cart-preview-qty">
              <button type="button" class="cart-qty-btn" data-action="decrementar" aria-label="Restar unidad">−</button>
              <span class="cart-qty-value">${item.cantidad}</span>
              <button type="button" class="cart-qty-btn" data-action="incrementar" aria-label="Sumar unidad">+</button>
            </div>
          </div>
          <button type="button" class="cart-preview-remove" data-action="eliminar" aria-label="Quitar producto">✕</button>
        </li>
      `;
    })
    .join('');

  const total = obtenerTotalCarrito();

  return `
    <ul class="cart-preview-list">${items}</ul>
    <div class="cart-preview-total">
      <span>Total</span>
      <span>$${total.toLocaleString('es-AR')}</span>
    </div>
    <button type="button" class="cart-preview-checkout" id="cart-checkout-btn">
      Continuar compra
    </button>
  `;
}

function renderPanel() {
  const panel = document.getElementById('cart-preview');
  if (!panel) return;
  panel.innerHTML = renderContenido();
  conectarEventos(panel);
}

function conectarEventos(panel) {
  panel.querySelectorAll('.cart-preview-item').forEach((item) => {
    const id = item.dataset.id;

    item.querySelector('[data-action="incrementar"]').addEventListener('click', () => {
      incrementarCantidad(id);
    });

    item.querySelector('[data-action="decrementar"]').addEventListener('click', () => {
      decrementarCantidad(id);
    });

    item.querySelector('[data-action="eliminar"]').addEventListener('click', () => {
      eliminarDelCarrito(id);
    });
  });

  const checkoutBtn = panel.querySelector('#cart-checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      panel.innerHTML = `<p class="cart-preview-success">¡Gracias por tu compra! (simulada)</p>`;
      vaciarCarrito();
      setTimeout(() => {
        cerrarCartPreview();
      }, 1500);
    });
  }
}

export function abrirCartPreview() {
  const panel = document.getElementById('cart-preview');
  if (!panel) return;
  panel.classList.add('cart-preview-open');
  isOpen = true;
  renderPanel();
}

export function cerrarCartPreview() {
  const panel = document.getElementById('cart-preview');
  if (!panel) return;
  panel.classList.remove('cart-preview-open');
  isOpen = false;
}

export function toggleCartPreview() {
  if (isOpen) {
    cerrarCartPreview();
  } else {
    abrirCartPreview();
  }
}

export function renderCartPreview() {
  let panel = document.getElementById('cart-preview');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'cart-preview';
    panel.className = 'cart-preview';
    panel.addEventListener('click', (event) => event.stopPropagation());
    document.querySelector('.cart-widget-container')?.appendChild(panel);
  }
  return panel;
}

window.addEventListener('cart:updated', () => {
  if (isOpen) {
    renderPanel();
  }
});

document.addEventListener('click', (event) => {
  if (!isOpen) return;
  const panel = document.getElementById('cart-preview');
  const toggleBtn = document.getElementById('cart-toggle');
  if (panel && !panel.contains(event.target) && event.target !== toggleBtn) {
    cerrarCartPreview();
  }
});