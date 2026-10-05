import React from 'react';
import { finishes } from '../data/finishes.js';
import { warrantyProgram } from '../data/warrantyProgram.js';
import './ProductDetail.css';

// Receives the selected product via props. Conditional render: renders nothing if no product.
// onAddToCart(product): adds it to the cart. onBack: optional, goes back to the catalog.
export const ProductDetail = ({ product, onAddToCart, onBack }) => {
  if (!product) return null;

  // The product only has the finish id; the details come from data/finishes.js
  const finish = finishes.find((f) => f.id === product.finish);

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={`/${product.image}`} alt={product.name} />
      </div>
      <div className="product-detail-info">
        {onBack && (
          <button type="button" className="btn-volver" onClick={onBack}>
            ← Volver al catálogo
          </button>
        )}
        <h1>{product.name}</h1>
        <p className="detail-price">${product.price.toLocaleString('es-AR')}</p>

        <div className="specs-section">
          <p><strong>Dimensiones:</strong> {product.size}</p>
          <p><strong>Materiales:</strong> {product.materials}</p>
          {finish ? (
            <>
              <p><strong>Acabado:</strong> {finish.name}</p>
              <p><strong>Composición:</strong> {finish.composition}</p>
              <p><strong>Aplicación:</strong> {finish.application}</p>
            </>
          ) : (
            <p><strong>Acabado:</strong> {product.finish}</p>
          )}
        </div>

        <p className="detail-description">{product.description}</p>

        <div className="detail-warranty">
          <h2>Garantía {warrantyProgram.name}</h2>
          <ul>
            {warrantyProgram.benefits.map((benefit) => (
              <li key={benefit.id}>
                <strong>{benefit.name}:</strong> {benefit.description}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="btn-comprar"
          onClick={() => onAddToCart && onAddToCart(product)}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};