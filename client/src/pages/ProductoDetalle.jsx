import { ProductDetail } from '../components/ProductDetail.jsx';

function ProductoDetalle({ productId, onAddToCart, onBack }) {
  return (
    <main>
      <ProductDetail productId={productId} onAddToCart={onAddToCart} onBack={onBack} />
    </main>
  );
}

export default ProductoDetalle;
