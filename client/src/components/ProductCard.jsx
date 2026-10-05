import React from 'react';
import { finishes } from '../data/finishes.js';
import './ProductCard.css';

// onViewDetail(id): abre el detalle del producto. onAddToCart(product): lo suma al carrito.
export const ProductCard = ({ product, onViewDetail, onAddToCart }) => {
  // El producto trae solo el id del acabado; el nombre sale de data/finishes.js
  const finish = finishes.find((f) => f.id === product.finish);

  return (
    <div className="product-card">
      <img src={`/${product.image}`} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">${product.price.toLocaleString('es-AR')}</p>
        <p className="product-finish">Acabado: {finish ? finish.name : product.finish}</p>
        <div className="product-actions">
          <button
            type="button"
            className="btn-detalle"
            onClick={() => onViewDetail && onViewDetail(product.id)}
          >
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
