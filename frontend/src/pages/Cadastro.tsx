import "../styles/auth.css";
import doctorTelemed from "../img/medicopagcadastro.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Cadastro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [crm, setCrm] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const cadastrar = async () => {
    try {
      const resposta = await fetch("http://localhost:8000/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, crm, email, senha })
      });
      const dados = await resposta.json();
      if (resposta.ok) {
        alert("Cadastro realizado com sucesso!");
        navigate("/login");
      } else {
        alert(dados.erro);
      }
    } catch {
      alert("Erro ao conectar com o servidor");
    }
  };

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
            <input
              type="text"
              placeholder="Digite seu nome"
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

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

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button className="btn-auth-submit" onClick={cadastrar}>Cadastrar</button>

          <p className="auth-redirect">
            Já tem uma conta? <Link to="/login">Faça Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}