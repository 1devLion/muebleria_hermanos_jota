import { useCallback, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import CartPreview from './components/CartPreview.jsx'
import Footer from './components/Footer.jsx'
import Inicio from './pages/Inicio.jsx'
import Productos from './pages/Productos.jsx'
import ProductoDetalle from './pages/ProductoDetalle.jsx'
import Contacto from './pages/Contacto.jsx'
import AdminCrearProducto from './pages/AdminCrearProducto.jsx'
import AdminEditarProducto from './pages/AdminEditarProducto.jsx'
import NotFound from './pages/NotFound.jsx'
import './App.css'

// Al cambiar de ruta vuelve arriba (antes lo hacía goTo).
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0 }) }, [pathname])
  return null
}

function App() {
  // ---------- Estado del carrito ----------
  // Cada item: { id, name, price, image, quantity }
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  // Agrega un producto del modelo (_id, nombre, precio, imagenUrl).
  // Si ya estaba en el carrito, suma 1 a la cantidad.
  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product._id)

      if (existing) {
        return current.map((item) =>
          item.id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }

      return [
        ...current,
        {
          id: product._id,
          name: product.nombre,
          price: product.precio,
          image: product.imagenUrl, // se resuelve con imageSrc en CartPreview
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

  return (
    <>
      <ScrollToTop />

      <Navbar cartCount={cartCount} onCartClick={toggleCart}>
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

      {/* Cada URL muestra una página; "*" atrapa cualquier ruta que no exista. */}
      <Routes>
        <Route path="/" element={<Inicio onAddToCart={addToCart} />} />
        <Route path="/productos" element={<Productos onAddToCart={addToCart} />} />
        <Route path="/productos/:id" element={<ProductoDetalle onAddToCart={addToCart} />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/admin/crear-producto" element={<AdminCrearProducto />} />
        <Route path="/admin/editar-producto/:id" element={<AdminEditarProducto />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
