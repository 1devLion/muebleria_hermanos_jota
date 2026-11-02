import { useState } from 'react';
import './ProductForm.css';

// Formulario controlado para crear y editar productos.
// initialValues: datos iniciales (edición). onSubmit: función async que recibe los datos.
function ProductForm({ initialValues = {}, onSubmit, submitLabel = 'Guardar' }) {
  // Un solo estado con los 5 campos del formulario.
  const [values, setValues] = useState({
    nombre: initialValues.nombre ?? '',
    descripcion: initialValues.descripcion ?? '',
    precio: initialValues.precio ?? '',
    stock: initialValues.stock ?? '',
    imagenUrl: initialValues.imagenUrl ?? '',
  });
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  // Actualiza el campo que cambió usando su atributo name.
  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    // Validaciones del lado del cliente (el backend vuelve a validar).
    if (values.nombre.trim() === '') return setError('El nombre es obligatorio.');
    if (values.precio === '' || Number(values.precio) < 0) {
      return setError('El precio es obligatorio y no puede ser negativo.');
    }
    if (values.stock !== '' && Number(values.stock) < 0) {
      return setError('El stock no puede ser negativo.');
    }

    setSending(true);
    try {
      // precio y stock viajan como números, no como texto.
      await onSubmit({
        ...values,
        precio: Number(values.precio),
        stock: values.stock === '' ? 0 : Number(values.stock),
      });
    } catch (err) {
      setError(err.message); // muestro el error que devuelva la API
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      <label>Nombre
        <input name="nombre" value={values.nombre} onChange={handleChange} />
      </label>
      <label>Descripción
        <textarea name="descripcion" rows="4" value={values.descripcion} onChange={handleChange} />
      </label>
      <label>Precio
        <input type="number" name="precio" min="0" value={values.precio} onChange={handleChange} />
      </label>
      <label>Stock
        <input type="number" name="stock" min="0" value={values.stock} onChange={handleChange} />
      </label>
      <label>Imagen (ruta o URL)
        <input name="imagenUrl" value={values.imagenUrl} onChange={handleChange} />
      </label>

      {error && <p className="product-form-error">{error}</p>}

      <button type="submit" disabled={sending}>
        {sending ? 'Guardando...' : submitLabel}
      </button>
    </form>
  );
}

export default ProductForm;
