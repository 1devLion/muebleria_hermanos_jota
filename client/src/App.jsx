import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import './App.css'

function App() {
  const [cartCount] = useState(0)

  return (
    <>
      <Navbar cartCount={cartCount} />
      <h1>Mueblería Hermanos Jota</h1>
    </>
  )
}

export default App
