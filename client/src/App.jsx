import { useCallback, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import CartPreview from './components/CartPreview.jsx'
import Footer from './components/Footer.jsx'
import Inicio from './pages/Inicio.jsx'
import Productos from './pages/Productos.jsx'
import ProductoDetalle from './pages/ProductoDetalle.jsx'
import Contacto from './pages/Contacto.jsx'
import './App.css'

// Vistas de la aplicación: se muestra una u otra con renderizado condicional.
const VIEWS = {
  HOME: 'home',
  CATALOG: 'catalog',
  DETAIL: 'detail',
  CONTACT: 'contact',
}

function App() {
  // ---------- Navegación entre vistas ----------
  const [view, setView] = useState(VIEWS.HOME)
  const [selectedProductId, setSelectedProductId] = useState(null)

  function goTo(nextView) {
    setView(nextView)
    window.scrollTo({ top: 0 })
  }

  function viewProductDetail(productId) {
    setSelectedProductId(productId)
    goTo(VIEWS.DETAIL)
  }

  // ---------- Estado del carrito ----------
  // Cada item: { id, name, price, image, quantity }
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  // Agrega un producto; si ya estaba en el carrito, suma 1 a la cantidad.
  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)

      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }

      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ]
    })
  }

  function incrementItem(productId) {
    setCart((current) =>
      current.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  // Baja 1 la cantidad; si llega a 0, el item sale del carrito.
  function decrementItem(productId) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  function removeItem(productId) {
    setCart((current) => current.filter((item) => item.id !== productId))
  }

  function clearCart() {
    setCart([])
  }

  // Valores derivados: se calculan en cada render, no se guardan en estado.
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const toggleCart = () => setCartOpen((open) => !open)
  const closeCart = useCallback(() => setCartOpen(false), [])

  // ---------- Renderizado condicional de la vista actual ----------
  function renderView() {
    switch (view) {
      case VIEWS.CATALOG:
        return <Productos onViewDetail={viewProductDetail} onAddToCart={addToCart} />

      case VIEWS.DETAIL:
        return (
          <ProductoDetalle
            productId={selectedProductId}
            onAddToCart={addToCart}
            onBack={() => goTo(VIEWS.CATALOG)}
          />
        )

      case VIEWS.CONTACT:
        return <Contacto />

      case VIEWS.HOME:
      default:
        return <Inicio onViewDetail={viewProductDetail} onAddToCart={addToCart} />
    }
  }

  return (
    <>
      <Navbar
        cartCount={cartCount}
        currentView={view}
        onNavigate={goTo}
        onCartClick={toggleCart}
      >
        <CartPreview
          open={cartOpen}
          cart={cart}
          total={cartTotal}
          onClose={closeCart}
          onIncrement={incrementItem}
          onDecrement={decrementItem}
          onRemove={removeItem}
          onClear={clearCart}
          onCheckout={clearCart}
        />
      </Navbar>

      {renderView()}

      <Footer />
    </>
  )
}

export default App
