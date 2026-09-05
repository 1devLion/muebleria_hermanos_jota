export function renderFooter() {
  const container = document.getElementById('footer') || document.createElement('div');
  container.id = 'footer';

  container.innerHTML = `
    <div class="footer-info">
      <h2>Mueblería Hermanos Jota</h2>

      <div class="footer-contenido">
        <div>
          <h3>Información</h3>
          <p>Av. San Juan 2847, San Cristóbal, CABA</p>
          <p>Lunes a viernes: 10 a 19 hs</p>
          <p>Sábados: 10 a 14 hs</p>
        </div>

        <div>
          <h3>Contacto</h3>
          <p>Instagram: @hermanosjota_ba</p>
          <p>WhatsApp: +54 11 4567-8900</p>
        </div>
      </div>
    </div>
  `;

  if (!container.parentElement) {
    document.body.appendChild(container);
  }

  return container;
}
