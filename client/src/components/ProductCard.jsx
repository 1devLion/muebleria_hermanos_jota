import React from 'react';

export const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">${product.price.toLocaleString()}</p>
        <p className="product-finish">Acabado: {product.finish}</p>
        <a href={`/producto/${product.id}`} className="btn-detalle">Ver Detalle</a>
      </div>
    </div>
  );
};