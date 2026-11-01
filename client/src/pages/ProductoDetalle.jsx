import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductDetail } from '../components/ProductDetail.jsx';
import { getProductById } from '../services/productsApi.js';

function ProductoDetalle({ onAddToCart }) {
  const { id } = useParams(); // id que viene de /productos/:id
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setNotFound(false);

    getProductById(id)
      .then(setProduct)
      .catch((err) => {
        // 404: no existe. 400: el id no tiene formato válido. Ambos son "no encontrado".
        if (err.status === 404 || err.status === 400) setNotFound(true);
        else setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <main><p>Cargando producto...</p></main>;
  if (error) return <main><p>Error: {error}</p></main>;
  if (notFound) {
    return (
      <main>
        <h1>Producto no encontrado</h1>
        <Link to="/productos">Volver al catálogo</Link>
      </main>
    );
  }

  return (
    <main>
      <ProductDetail product={product} onAddToCart={onAddToCart} />
    </main>
  );
}

export default ProductoDetalle;
