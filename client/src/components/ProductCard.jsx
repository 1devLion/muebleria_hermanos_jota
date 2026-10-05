import React from 'react';
import { finishes } from '../data/finishes.js';
import './ProductCard.css';

// Receives product and onViewDetail(product), called on the detail button click.
// onAddToCart(product) is optional: when provided, the cart button is shown.
export const ProductCard = ({ product, onViewDetail, onAddToCart }) => {
  // The product only has the finish id; the name comes from data/finishes.js
  const finish = finishes.find((f) => f.id === product.finish);

  return (
    <div className="product-card">
      <img src={`/${product.image}`} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">${product.price.toLocaleString('es-AR')}</p>
        <p className="product-finish">Acabado: {finish ? finish.name : product.finish}</p>
        <div className="product-actions">
          <button type="button" className="btn-detalle" onClick={() => onViewDetail(product)}>
            Ver Detalle
          </button>
          {onAddToCart && (
            <button
              type="button"
              className="btn-agregar"
              onClick={() => onAddToCart(product)}
              aria-label={`Añadir ${product.name} al carrito`}
            >
              🛒
            </button>
          )}
        </div>
      </div>
    </div>
  );
};