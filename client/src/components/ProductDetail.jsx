import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
      .then(res => res.json())
      .then(data => {
        const found = data.data.find(p => p.id === id);
        if (found) {
          setProduct(found);
        } else {
          setError('Producto no encontrado');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Error al obtener el detalle del producto');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Cargando detalles del mueble...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return null;

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
          <p><strong>Acabado (Finish):</strong> {product.finish}</p>
          
          {product.warrantyProgram && (
            <p className="warranty-badge">
              <strong>Programa de Garantía:</strong> {product.warrantyProgram}
            </p>
          )}
        </div>

        <p className="detail-description">{product.description}</p>
        
        <button className="btn-comprar">Agregar al Carrito</button>
      </div>
    </div>
  );
};