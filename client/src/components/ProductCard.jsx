import { Link } from 'react-router-dom';
import { finishes } from '../data/finishes.js';
import { imageSrc } from '../utils/imageSrc.js';
import './ProductCard.css';

// product viene del modelo: _id, nombre, precio, acabado, imagenUrl.
// onAddToCart(product) es opcional: si está, se muestra el botón del carrito.
export const ProductCard = ({ product, onAddToCart }) => {
  // El producto guarda solo el id del acabado; el nombre sale de data/finishes.js
  const finish = finishes.find((f) => f.id === product.acabado);

  return (
    <div className="product-card">
      <img src={imageSrc(product.imagenUrl)} alt={product.nombre} className="product-image" />
      <div className="product-info">
        <h3>{product.nombre}</h3>
        <p className="product-price">${product.precio.toLocaleString('es-AR')}</p>
        {product.acabado && (
          <p className="product-finish">Acabado: {finish ? finish.name : product.acabado}</p>
        )}
        <div className="product-actions">
          <Link to={`/productos/${product._id}`} className="btn-detalle">Ver Detalle</Link>
          {onAddToCart && (
            <button
              type="button"
              className="btn-agregar"
              onClick={() => onAddToCart(product)}
              aria-label={`Añadir ${product.nombre} al carrito`}
            >
              🛒
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
