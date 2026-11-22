// client/src/pages/Inicio.jsx
import Hero from '../components/Hero.jsx';
import { ProductList } from '../components/ProductList.jsx';
import './Inicio.css';

function Inicio({ onAddToCart }) {
  return (
    <main>
      <Hero />
      <section className="productos-destacados">
        <h2>Productos destacados</h2>
        <ProductList limit={3} onAddToCart={onAddToCart} />
      </section>
    </main>
  );
}

export default Inicio;
