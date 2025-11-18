import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contato</h3>
            <p>📞 (11) 3456-7890</p>
            <p>📧 contato@clinicaodontologica.com.br</p>
          </div>
          <div className="footer-section">
            <h3>Endereço</h3>
            <p>Rua das Flores, 123</p>
            <p>São Paulo - SP, 01234-567</p>
          </div>
          <div className="footer-section">
            <h3>Redes Sociais</h3>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <img src="/images/icons/facebook.png" alt="Facebook" />
              </a>
              <a href="#" aria-label="Instagram">
                <img src="/images/icons/instagram.png" alt="Instagram" />
              </a>
              <a href="#" aria-label="WhatsApp">
                <img src="/images/icons/whatsapp.png" alt="WhatsApp" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Clínica Odontológica. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


