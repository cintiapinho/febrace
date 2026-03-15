import { Link } from "react-router-dom";
import "../styles/Suporte.css";

export default function Suporte() {
  return (
    <div className="suporte-container">
      <div className="suporte-left">
        <Link to="/dashboard" className="btn-back">
          ←
        </Link>
      </div>

      <div className="suporte-right">
        <h1 className="suporte-title">Suporte</h1>

        <div className="suporte-form">
          <label className="suporte-label">Seu nome:</label>
          <input type="text" className="suporte-input" />

          <label className="suporte-label">E-mail:</label>
          <input type="email" className="suporte-input" />

          <label className="suporte-label">Descrição do Problema:</label>
          <textarea className="suporte-textarea"></textarea>
        </div>
      </div>
    </div>
  );
}

