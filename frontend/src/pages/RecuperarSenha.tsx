import "../styles/auth.css";
import doctorClipboard from "../img/medicopagrecsenha.png";
import { useState } from "react";

export default function RecuperarSenha() {

  const [crm, setCrm] = useState("");
  const [email, setEmail] = useState("");

  const recuperarSenha = async () => {

    try {

      const resposta = await fetch("http://localhost:8000/recuperar-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          crm: crm,
          email: email
        })
      });

      const dados = await resposta.json();

      if (resposta.ok) {

        alert("Nova senha: " + dados.nova_senha);

      } else {

        alert(dados.erro);

      }

    } catch (erro) {

      console.error(erro);
      alert("Erro ao conectar com servidor");

    }

  };

  return (
    <div className="auth-page">

      <div className="auth-form-container">
        <div className="auth-form-wrapper">

          <a href="/login" style={{fontSize: '24px', textDecoration: 'none', color: '#000'}}>←</a>

          <h2>Recuperar Senha</h2>

          <div className="input-group">
            <label>CRM</label>
            <input
              type="text"
              placeholder="Digite seu CRM"
              onChange={(e) => setCrm(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            className="btn-auth-submit"
            onClick={recuperarSenha}
          >
            Enviar
          </button>

        </div>
      </div>

      <div className="auth-sidebar">
        <img src={doctorClipboard} alt="Médico com prancheta" />
      </div>

    </div>
  );
}
