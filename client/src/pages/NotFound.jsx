import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main>
      <h1>Página no encontrada</h1>
      <p>La dirección que buscás no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </main>
  );
}

export default NotFound;
