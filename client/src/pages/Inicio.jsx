import { ProductList } from '../components/ProductList.jsx';

function Inicio({ onViewDetail, onAddToCart }) {
  return (
    <main>
      {/* TODO: sumar <Hero /> cuando Ramiro termine el componente. */}
      <h1>Inicio</h1>
      <ProductList limit={3} onViewDetail={onViewDetail} onAddToCart={onAddToCart} />
    </main>
  );
}

export default Inicio;
