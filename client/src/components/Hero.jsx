// client/src/components/Hero.jsx
import { Link } from 'react-router-dom';
import './Hero.css';

// Banner principal del inicio: imagen de fondo, título, bajada y botón al catálogo.
function Hero() {
  return (
    <section className="hero">
      {/* La ruta empieza con "/" porque Vite sirve la carpeta public/ desde la raíz */}
      <img src="/img/herobanner/banner.webp" alt="Muebles para el hogar" />
      <div className="hero-content">
        <h1 className="titulo-principal">Diseño con historia</h1>
        <p className="texto-cuerpo">
          Más de 6 décadas de carpintería artesanal, hoy en su tercera generación.
        </p>
        {/* Link navega sin recargar la página (a diferencia de <a href>) */}
        <Link to="/productos" className="hero-button btn-texto">Ver catálogo</Link>
      </div>
    </section>
  );
}

export default Hero;
