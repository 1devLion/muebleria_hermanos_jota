import { useState } from 'react';
import './ContactForm.css';

// Valida un email con un formato básico (texto@texto.texto).
function esEmailValido(email) {
  const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patronEmail.test(email);
}

function ContactForm() {
  // Un estado por cada campo del formulario.
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Estado para el mensaje de éxito/error a mostrar.
  const [resultado, setResultado] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    const errores = [];

    if (nombre.trim() === '') {
      errores.push('El nombre es obligatorio.');
    }

    if (email.trim() === '') {
      errores.push('El email es obligatorio.');
    } else if (esEmailValido(email) === false) {
      errores.push('El email no tiene un formato válido.');
    }

    if (mensaje.trim() === '') {
      errores.push('El mensaje es obligatorio.');
    }

    if (errores.length > 0) {
      setResultado({ tipo: 'error', texto: errores.join(' ') });
      return;
    }

    setResultado({ tipo: 'exito', texto: '¡Consulta enviada con éxito! Te responderemos a la brevedad.' });
    setNombre('');
    setEmail('');
    setMensaje('');
  }

  return (
    <form className="formulario-contacto" onSubmit={handleSubmit} noValidate>
      <h2>Envíanos tu consulta</h2>

      <div className="campo-formulario">
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
          placeholder="Ingresá tu nombre"
        />
      </div>

      <div className="campo-formulario">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="direccion@email.com"
        />
      </div>

      <div className="campo-formulario">
        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          rows="6"
          value={mensaje}
          onChange={(event) => setMensaje(event.target.value)}
          placeholder="Contanos en qué podemos ayudarte"
        />
      </div>

      <button className="boton-enviar" type="submit">
        Enviar consulta
      </button>

      {resultado && (
        <p className={`mensaje-formulario mensaje-formulario--${resultado.tipo}`}>
          {resultado.texto}
        </p>
      )}
    </form>
  );
}

export default ContactForm;
