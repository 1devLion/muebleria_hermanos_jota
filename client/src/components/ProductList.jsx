import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard.jsx';
import { getProducts } from '../services/productsApi.js';
import './ProductList.css';

// limit: si se pasa, muestra solo esa cantidad (destacados del inicio) y oculta el buscador.
// onAddToCart: función del padre que se pasa a cada ProductCard.
export const ProductList = ({ limit, onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga el catálogo con la capa de API (devuelve el array ya parseado).
  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(err => {
        // Sin conexión, fetch falla con un TypeError cuyo mensaje no es claro.
        setError(err instanceof TypeError ? 'No se pudo conectar con el servidor' : err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filtrado en tiempo real por nombre o descripción (descripcion es opcional en el modelo).
  const query = search.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.nombre.toLowerCase().includes(query) ||
    (product.descripcion ?? '').toLowerCase().includes(query)
  );

  const displayedProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

  if (loading) return <div className="loading-state">Cargando catálogo...</div>;
  if (error) return <div className="error-state">Error: {error}</div>;

  return (
    <div className="product-list-container">
      {/* El buscador solo se muestra en la vista completa */}
      {!limit && (
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Buscar muebles por nombre o descripción..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      )}

      <div className="product-grid">
        {displayedProducts.length > 0 ? (
          displayedProducts.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))
        ) : (
          <p className="no-results">No se encontraron productos que coincidan con tu búsqueda.</p>
        )}
      </div>
    </div>
  );
};
