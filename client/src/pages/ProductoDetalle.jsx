import { useParams } from 'react-router-dom';

function ProductoDetalle() {
  const { id } = useParams();

  return (
    <main>
      <h1>Detalle del producto</h1>
      <p>{id}</p>
    </main>
  );
}

export default ProductoDetalle;