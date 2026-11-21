// client/src/pages/AdminEditarProducto.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm.jsx';
import { getProductById, updateProduct } from '../services/productsApi.js';

function AdminEditarProducto() {
  const { id } = useParams(); // id que viene de la URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Trae el producto para precargar el formulario.
  useEffect(() => {
    let ignore = false; // pasa a true si el componente se desmonta o cambia el id
    setLoading(true);
    setError(null);

    getProductById(id)
      .then((data) => { if (!ignore) setProduct(data); })
      .catch((err) => { if (!ignore) setError(err.message); })
      .finally(() => { if (!ignore) setLoading(false); });

    // Cleanup: React lo ejecuta al desmontar y antes de repetir el efecto
    return () => { ignore = true; };
  }, [id]);

  // Guarda los cambios y vuelve al detalle.
  async function handleUpdate(values) {
    await updateProduct(id, values);
    navigate(`/productos/${id}`);
  }

  if (loading) return <main><p>Cargando producto...</p></main>;
  if (error) return <main><p>Error: {error}</p></main>;

  // El form se monta recién cuando el producto llegó (si no, quedaría vacío).
  return (
    <main>
      <h1>Editar producto</h1>
      <ProductForm initialValues={product} onSubmit={handleUpdate} submitLabel="Guardar cambios" />
    </main>
  );
}

export default AdminEditarProducto;
