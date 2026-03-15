import "../styles/auth.css";
import doctorTelemed from "../img/medicopagcadastro.png"; 
import { Link } from "react-router-dom";

export default function Cadastro() {
  return (
    <div className="auth-page">
      <div className="auth-sidebar">
        <img src={doctorTelemed} alt="Telemedicina" />
      </div>
      <div className="auth-form-container">
        <div className="auth-form-wrapper">
          <h2>Cadastro</h2>
          <div className="input-group">
            <label>Nome</label>
            <input type="text" placeholder="Digite seu nome" />
          </div>
          <div className="input-group">
            <label>CRM</label>
            <input type="text" placeholder="Digite seu CRM" />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Digite seu email" />
          </div>
          <div className="input-group">
            <label>Senha</label>
            <input type="password" placeholder="Digite sua senha" />
          </div>
          <button className="btn-auth-submit">Cadastrar</button>
          <p className="auth-redirect">
            Já tem uma conta? <Link to="/login">Faça Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}