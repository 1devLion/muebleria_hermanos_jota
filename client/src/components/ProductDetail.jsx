import React, { useState, useEffect } from 'react';
import { finishes } from '../data/finishes.js';
import { warrantyProgram } from '../data/warrantyProgram.js';
import { API_URL } from '../config.js';
import './ProductDetail.css';

// productId: id del producto a mostrar. onBack: vuelve al catálogo. onAddToCart(product): suma al carrito.
export const ProductDetail = ({ productId, onAddToCart, onBack }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false; // evita pisar el estado si se cambió de producto mientras cargaba
    setLoading(true);
    setError(null);

    fetch(`${API_URL}/api/productos/${productId}`)
      .then(res => {
        if (res.status === 404) throw new Error('Producto no encontrado');
        if (!res.ok) throw new Error('Error al obtener el detalle del producto');
        return res.json();
      })
      .then(data => {
        if (ignore) return;
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        if (ignore) return;
        setError(err instanceof TypeError ? 'No se pudo conectar con el servidor' : err.message);
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [productId]);

  if (loading) return <div className="loading">Cargando detalles del mueble...</div>;
  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button type="button" className="btn-volver" onClick={onBack}>
          Volver al catálogo
        </button>
      </div>
    );
  }
  if (!product) return null;

  // El producto trae solo el id del acabado; el detalle sale de data/finishes.js
  const finish = finishes.find((f) => f.id === product.finish);

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={`/${product.image}`} alt={product.name} />
      </div>
      <div className="product-detail-info">
        <button type="button" className="btn-volver" onClick={onBack}>
          ← Volver al catálogo
        </button>
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
