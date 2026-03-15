import "../styles/auth.css";
import doctorClipboard from "../img/medicopagrecsenha.png"; 

export default function RecuperarSenha() {
  return (
    <div className="auth-page">
      <div className="auth-form-container">
        <div className="auth-form-wrapper">
          <a href="/login" style={{fontSize: '24px', textDecoration: 'none', color: '#000'}}>←</a>
          <h2>Recuperar Senha</h2>
          <div className="input-group">
            <label>CRM</label>
            <input type="text" placeholder="Digite seu CRM" />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Digite seu email" />
          </div>
          <button className="btn-auth-submit">Enviar</button>
        </div>
      </div>
      <div className="auth-sidebar">
        <img src={doctorClipboard} alt="Médico com prancheta" />
      </div>
    </div>
  );
}