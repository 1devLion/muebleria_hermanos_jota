import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';

// Valida un email con un formato básico (texto@texto.texto).
function esEmailValido(email) {
  const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patronEmail.test(email);
}

// Revisa los datos del formulario y devuelve un array con los errores encontrados.
function validarDatos(nombre, email, mensaje) {
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

  return errores;
}

// Muestra un mensaje de éxito o error debajo del formulario.
function mostrarMensaje(form, tipo, texto) {
  // Elimina un mensaje anterior si ya existía.
  const mensajeAnterior = form.querySelector('.mensaje-formulario');
  if (mensajeAnterior) {
    mensajeAnterior.remove();
  }

  const mensajeElemento = document.createElement('p');
  mensajeElemento.className = `mensaje-formulario mensaje-formulario--${tipo}`;
  mensajeElemento.textContent = texto;

  form.appendChild(mensajeElemento);
}

// Inicializa la validación del formulario de contacto.
function initFormularioContacto() {
  const form = document.querySelector('.formulario-contacto');
  if (!form) return;

  // Desactiva la validación nativa del navegador para usar la nuestra.
  form.noValidate = true;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = form.querySelector('#nombre').value;
    const email = form.querySelector('#email').value;
    const mensaje = form.querySelector('#mensaje').value;

    const errores = validarDatos(nombre, email, mensaje);

    if (errores.length > 0) {
      mostrarMensaje(form, 'error', errores.join(' '));
      return;
    }

    mostrarMensaje(form, 'exito', '¡Consulta enviada con éxito! Te responderemos a la brevedad.');
    form.reset();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  initFormularioContacto();
});
