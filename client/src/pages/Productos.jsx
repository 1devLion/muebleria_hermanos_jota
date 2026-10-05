import { ProductList } from '../components/ProductList.jsx';

function Productos({ onViewDetail, onAddToCart }) {
  return (
    <main>
      <h1>Productos</h1>
      <ProductList onViewDetail={onViewDetail} onAddToCart={onAddToCart} />
    </main>
  );
}

export default Productos;
