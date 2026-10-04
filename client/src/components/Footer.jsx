import './Footer.css';

function Footer() {
  return (
    <footer className="footer-info">
      <h2>Mueblería Hermanos Jota</h2>

      <div className="footer-contenido">
        <div>
          <h3>Información</h3>
          <address>Av. San Juan 2847, San Cristóbal, CABA</address>
          <p>Lunes a viernes: 10 a 19 hs</p>
          <p>Sábados: 10 a 14 hs</p>
        </div>

        <div>
          <h3>Contacto</h3>
          <address>
            Instagram: @hermanosjota_ba
            <br />
            WhatsApp: +54 11 4567-8900
          </address>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
