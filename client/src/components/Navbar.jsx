import './Navbar.css';

const LINKS = [
  { view: 'home', label: 'Inicio' },
  { view: 'catalog', label: 'Productos' },
  { view: 'contact', label: 'Contacto' },
];

// cartCount: cantidad de productos en el carrito (la pasa App).
// currentView: vista que se está mostrando ('home' | 'catalog' | 'detail' | 'contact').
// onNavigate: callback que recibe la vista a mostrar.
// onCartClick: callback opcional para abrir la vista previa del carrito.
// children: se dibuja dentro de .navbar-cart (ahí va <CartPreview />).
function Navbar({ cartCount = 0, currentView, onNavigate, onCartClick, children }) {
  // El detalle de un producto se considera parte del catálogo.
  const activeView = currentView === 'detail' ? 'catalog' : currentView;

  function handleNavigate(event, view) {
    event.preventDefault();
    if (onNavigate) onNavigate(view);
  }

  return (
    <header className="navbar">
      <a
        href="/"
        className="navbar-logo"
        aria-label="Mueblería Hermanos Jota - Inicio"
        onClick={(event) => handleNavigate(event, 'home')}
      >
        <img src="/img/ui/logo.svg" alt="Logo de la empresa" />
      </a>

      <nav className="navbar-nav" aria-label="Navegación principal">
        {LINKS.map((link) => (
          <a
            key={link.view}
            href="/"
            className={
              activeView === link.view ? 'navbar-link navbar-link--active' : 'navbar-link'
            }
            aria-current={activeView === link.view ? 'page' : undefined}
            onClick={(event) => handleNavigate(event, link.view)}
          >
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
          {children}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
