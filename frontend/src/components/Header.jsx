import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img src="/images/logo.png" alt="Logo Clínica" />
            <span>Clínica Odontológica</span>
          </Link>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/tratamentos">Tratamentos</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

