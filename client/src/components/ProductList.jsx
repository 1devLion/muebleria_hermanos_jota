import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard.jsx';
import { API_URL } from '../config.js';
import './ProductList.css';

// limit: if provided, shows only that many items (home featured) and hides the search bar.
// onViewDetail / onAddToCart: parent functions passed down to each ProductCard.
export const ProductList = ({ limit, onViewDetail, onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/productos`)
      .then(res => {
        if (!res.ok) {
          throw new Error('No se pudo conectar con el servidor');
        }
        return res.json();
      })
      .then(data => {
        // The backend returns the array directly ({ data: [...] } is also accepted).
        setProducts(Array.isArray(data) ? data : data.data);
        setLoading(false);
      })
      .catch(err => {
        // Without a connection fetch fails with a TypeError whose message is not clear.
        setError(err instanceof TypeError ? 'No se pudo conectar con el servidor' : err.message);
        setLoading(false);
      });
  }, []);

  // Real-time filtering by name or description.
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.description.toLowerCase().includes(search.toLowerCase())
  );

  const displayedProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

  if (loading) return <div className="loading-state">Cargando catálogo...</div>;
  if (error) return <div className="error-state">Error: {error}</div>;

  return (
    <div className="product-list-container">
      {/* The search bar is only shown in the full view */}
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
              key={product.id}
              product={product}
              onViewDetail={onViewDetail}
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