import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/productos', label: 'Productos' },
  { to: '/contacto', label: 'Contacto' },
];

// cartCount: cantidad de productos en el carrito (la pasa el carrito).
// onCartClick: callback opcional para abrir la vista previa del carrito.
function Navbar({ cartCount = 0, onCartClick }) {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo" aria-label="Mueblería Hermanos Jota - Inicio">
        <img src="/img/ui/logo.svg" alt="Logo de la empresa" />
      </Link>

      <nav className="navbar-nav" aria-label="Navegación principal">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? 'navbar-link navbar-link--active' : 'navbar-link'
            }
          >
            {link.label}
          </NavLink>
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