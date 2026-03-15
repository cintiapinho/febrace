import { Link } from "react-router-dom";
import "../styles/navbar.css";
import logoSrc from "../img/logo.png";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
            <img src={logoSrc} alt="Logotipo" />
            <span>
              Dr.<strong>AI</strong>gnóstico
            </span>
          </Link>
        </div>

        <nav className="nav-links">
          <a href="#home">Sobre nós</a>
          <a href="/Planos">Nossos Planos</a>
          { }
          <Link to="/login" className="btn-login">Login</Link>
        </nav>
      </div>
    </header>
  );
}