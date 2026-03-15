import "../styles/footer.css";
import logoSRC from "../img/logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <img src={logoSRC} alt="Dr. AIgnóstico" />
          <span>Dr.AIgnóstico</span>
        </div>

        <div className="footer-socials">
          <a href="#" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://www.instagram.com/dr.aignostico/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
        </div>
      </div>

      <hr />

      <p className="footer-copy">
        © 2026 Dr. AIgnóstico. Todos os direitos reservados.
      </p>
    </footer>
  );
}