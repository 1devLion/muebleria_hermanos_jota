import './Navbar.css';

const LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/productos', label: 'Productos' },
  { href: '/contacto', label: 'Contacto' },
];

// cartCount: cantidad de productos en el carrito (la pasa el carrito).
// onCartClick: callback opcional para abrir la vista previa del carrito.
function Navbar({ cartCount = 0, onCartClick }) {
  return (
    <header className="navbar">
      <a href="/" className="navbar-logo" aria-label="Mueblería Hermanos Jota - Inicio">
        <img src="/img/ui/logo.svg" alt="Logo de la empresa" />
      </a>

      <nav className="navbar-nav" aria-label="Navegación principal">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} className="navbar-link">
            {link.label}
          </a>
        ))}

        <div className="navbar-cart">
          <button
            type="button"
            className="cart-widget"
            onClick={onCartClick}
            aria-label={`Ver carrito, ${cartCount} productos`}
          >
            <span aria-hidden="true">🛒</span>
            <span className="cart-counter">{cartCount}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;