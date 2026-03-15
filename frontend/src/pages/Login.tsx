import "../styles/auth.css";
import doctorDoor from "../img/medicopaginalogin.png"; 
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="auth-page">
      <div className="auth-sidebar">
        <img src={doctorDoor} alt="Médico entrando" />
      </div>
      <div className="auth-form-container">
        <div className="auth-form-wrapper">
          <h1>Login</h1>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Digite seu email" />
          </div>
          <div className="input-group">
            <label>Senha</label>
            <input type="password" placeholder="Digite sua senha" />
          </div>
          <div className="auth-footer-links">
            <label><input type="checkbox" /> Lembrar sempre</label>
            <a href="/recuperar-senha">Esqueci minha senha</a>
          </div>
          <button className="btn-auth-submit">Login</button>
          <p className="auth-redirect">
            Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}