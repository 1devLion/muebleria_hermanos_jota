import { ProductDetail } from '../components/ProductDetail.jsx';

function ProductoDetalle({ product, onAddToCart, onBack }) {
  return (
    <main>
      <ProductDetail product={product} onAddToCart={onAddToCart} onBack={onBack} />
    </main>
  );
}

export default ProductoDetalle;
