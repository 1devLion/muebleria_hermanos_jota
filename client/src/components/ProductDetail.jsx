import React from 'react';
import { finishes } from '../data/finishes';
import { warrantyProgram } from '../data/warrantyProgram';
import './ProductDetail.css';

// Receives the selected product via props. Conditional render: renders nothing if no product.
export const ProductDetail = ({ product, onAddToCart }) => {
  if (!product) return null;

  const finish = finishes.find(f => f.id === product.finish);

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={`/${product.image}`} alt={product.name} />
      </div>
      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p className="detail-price">${product.price.toLocaleString()}</p>

        <div className="specs-section">
          <p><strong>Dimensiones:</strong> {product.size}</p>
          <p><strong>Materiales:</strong> {product.materials}</p>
          {finish && (
            <p>
              <strong>Acabado:</strong> {finish.name} — {finish.composition} {finish.application}
            </p>
          )}
        </div>

        <p className="detail-description">{product.description}</p>

        <div className="warranty-badge">
          <strong>Programa {warrantyProgram.name}</strong>
          <ul>
            {warrantyProgram.benefits.map(benefit => (
              <li key={benefit.id}>
                <strong>{benefit.name}:</strong> {benefit.description}
              </li>
            ))}
          </ul>
        </div>

        <button type="button" className="btn-comprar" onClick={() => onAddToCart(product)}>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};
