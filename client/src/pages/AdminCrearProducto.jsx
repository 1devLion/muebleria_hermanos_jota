import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm.jsx';
import { createProduct } from '../services/productsApi.js';

function AdminCrearProducto() {
  const navigate = useNavigate();

  // Crea el producto y va a su detalle.
  async function handleCreate(values) {
    const created = await createProduct(values);
    navigate(`/productos/${created._id}`);
  }

  return (
    <main>
      <h1>Crear producto</h1>
      <ProductForm onSubmit={handleCreate} submitLabel="Crear producto" />
    </main>
  );
}

export default AdminCrearProducto;
