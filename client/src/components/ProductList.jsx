import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';

export const ProductList = ({ limit }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
      .then(res => {
        if (!res.ok) {
          throw new Error('No se pudo conectar con el servidor');
        }
        return res.json();
      })
      .then(data => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filtrado en tiempo real por nombre o descripción
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.description.toLowerCase().includes(search.toLowerCase())
  );

  const displayedProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

  if (loading) return <div className="loading-state">Cargando catálogo...</div>;
  if (error) return <div className="error-state">Error: {error}</div>;

  return (
    <div className="product-list-container">
      {/* El buscador solo se muestra si estamos en la vista completa */}
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
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="no-results">No se encontraron productos que coincidan con tu búsqueda.</p>
        )}
      </div>
    </div>
  );
};