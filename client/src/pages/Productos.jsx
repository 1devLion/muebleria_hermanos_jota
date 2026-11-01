import { ProductList } from '../components/ProductList.jsx';

function Productos({ onAddToCart }) {
  return (
    <main>
      <h1>Productos</h1>
      <ProductList onAddToCart={onAddToCart} />
    </main>
  );
}

export default Productos;
