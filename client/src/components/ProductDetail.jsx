import { Link, useNavigate } from 'react-router-dom';
import { finishes } from '../data/finishes.js';
import { warrantyProgram } from '../data/warrantyProgram.js';
import { deleteProduct } from '../services/productsApi.js';
import { imageSrc } from '../utils/imageSrc.js';
import './ProductDetail.css';

export const ProductDetail = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  if (!product) return null;

  // Busco el acabado completo por id en finishes.js.
  const finish = finishes.find((f) => f.id === product.acabado);

  // Pide confirmación, elimina y vuelve al catálogo.
  async function handleDelete() {
    if (!window.confirm(`¿Eliminar "${product.nombre}"?`)) return;
    try {
      await deleteProduct(product._id);
      navigate('/productos');
    } catch (err) {
      window.alert(err.message);
    }
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={imageSrc(product.imagenUrl)} alt={product.nombre} />
      </div>
      <div className="product-detail-info">
        <Link to="/productos" className="btn-volver">← Volver al catálogo</Link>
        <h1>{product.nombre}</h1>
        <p className="detail-price">${product.precio.toLocaleString('es-AR')}</p>

        {/* medidas, materiales y acabado son opcionales en el modelo */}
        <div className="specs-section">
          {product.medidas && <p><strong>Dimensiones:</strong> {product.medidas}</p>}
          {product.materiales && <p><strong>Materiales:</strong> {product.materiales}</p>}
          {finish ? (
            <>
              <p><strong>Acabado:</strong> {finish.name}</p>
              <p><strong>Composición:</strong> {finish.composition}</p>
              <p><strong>Aplicación:</strong> {finish.application}</p>
            </>
          ) : (
            product.acabado && <p><strong>Acabado:</strong> {product.acabado}</p>
          )}
        </div>

        <p className="detail-description">{product.descripcion}</p>

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

        <div className="detail-actions">
          <button type="button" className="btn-comprar" onClick={() => onAddToCart && onAddToCart(product)}>
            Agregar al Carrito
          </button>
          <Link to={`/admin/editar-producto/${product._id}`} className="btn-editar">Editar</Link>
          <button type="button" className="btn-eliminar" onClick={handleDelete}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};
