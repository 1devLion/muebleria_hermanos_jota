import React from 'react';
import './ProductCard.css';

// Receives product and onViewDetail callback; calls it on detail button click.
export const ProductCard = ({ product, onViewDetail }) => {
  return (
    <div className="product-card">
      <img src={`/${product.image}`} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">${product.price.toLocaleString()}</p>
        <p className="product-finish">Acabado: {product.finish}</p>
        <button type="button" className="btn-detalle" onClick={() => onViewDetail(product)}>
          Ver Detalle
        </button>
      </div>
    </div>
  );
};
