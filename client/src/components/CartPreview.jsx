import { useEffect, useState } from 'react';
import './CartPreview.css';

// Vista previa del carrito (desplegable bajo el ícono del Navbar).
// Todo el estado vive en App.jsx; este componente solo muestra y avisa.
function CartPreview({
  open,
  cart,
  total,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
  onClear,
  onCheckout,
}) {
  const [purchased, setPurchased] = useState(false);

  // Cierra el panel al hacer click fuera del carrito.
  // Se usa mousedown (no click): al apretar "−" o "✕" el botón puede salir del DOM
  // antes de que llegue el click y se detectaría como "click afuera".
  useEffect(() => {
    if (!open) return;

    function handleMouseDown(event) {
      if (!event.target.closest('.navbar-cart')) onClose();
    }

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [open, onClose]);

  // Cierra con Escape.
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Después de la compra simulada, muestra el agradecimiento 1,5 s y cierra.
  useEffect(() => {
    if (!purchased) return;

    const timer = setTimeout(() => {
      setPurchased(false);
      onClose();
    }, 1500);

    return () => clearTimeout(timer);
  }, [purchased, onClose]);

  if (!open) return null;

  function handleCheckout() {
    onCheckout();
    setPurchased(true);
  }

  if (purchased) {
    return (
      <div className="cart-preview" role="status">
        <p className="cart-preview-success">¡Gracias por tu compra! (simulada)</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-preview">
        <p className="cart-preview-empty">Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className="cart-preview">
      <ul className="cart-preview-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-preview-item">
            <img
              src={`/${item.image}`}
              alt={item.name}
              className="cart-preview-image"
            />
            <div className="cart-preview-info">
              <p className="cart-preview-name">{item.name}</p>
              <p className="cart-preview-subtotal">
                ${(item.price * item.quantity).toLocaleString('es-AR')}
              </p>
              <div className="cart-preview-qty">
                <button
                  type="button"
                  className="cart-qty-btn"
                  onClick={() => onDecrement(item.id)}
                  aria-label={`Restar unidad de ${item.name}`}
                >
                  −
                </button>
                <span className="cart-qty-value">{item.quantity}</span>
                <button
                  type="button"
                  className="cart-qty-btn"
                  onClick={() => onIncrement(item.id)}
                  aria-label={`Sumar unidad de ${item.name}`}
                >
                  +
                </button>
              </div>
            </div>
            <button
              type="button"
              className="cart-preview-remove"
              onClick={() => onRemove(item.id)}
              aria-label={`Quitar ${item.name}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-preview-total">
        <span>Total</span>
        <span>${total.toLocaleString('es-AR')}</span>
      </div>

      <button type="button" className="cart-preview-checkout" onClick={handleCheckout}>
        Continuar compra
      </button>
      <button type="button" className="cart-preview-clear" onClick={onClear}>
        Vaciar carrito
      </button>
    </div>
  );
}

export default CartPreview;
