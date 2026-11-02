import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

// end: en "/" solo está activo si la URL es exactamente "/".
const LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/productos', label: 'Productos' }, // activo también en /productos/:id
  { to: '/contacto', label: 'Contacto' },
  { to: '/admin/crear-producto', label: 'Administración' },
];

// cartCount: productos en el carrito. onCartClick: abre la vista previa.
// children: se dibuja dentro de .navbar-cart (ahí va <CartPreview />).
function Navbar({ cartCount = 0, onCartClick, children }) {
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
            end={link.end}
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
          {children}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
