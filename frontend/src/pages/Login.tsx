import "../styles/auth.css";
import doctorDoor from "../img/medicopaginalogin.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const logar = async () => {

    if(!email || !senha){
      alert("Preencha email e senha");
      return;
    }

    try {

      const resposta = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          senha
        })
      });

      const dados = await resposta.json();

      if (resposta.ok) {

        // salvar usuario completo
        localStorage.setItem("usuario", JSON.stringify(dados));

        // salvar id separado (usado no perfil)
        localStorage.setItem("usuarioId", dados.id);

        alert("Login realizado!");

        navigate("/dashboard");

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
        <img src={doctorDoor} alt="Médico entrando" />
      </div>

      <div className="auth-form-container">

        <div className="auth-form-wrapper">

          <h1>Login</h1>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <div className="input-group">
            <label>Senha</label>

            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

          </div>

          <div className="auth-options-row">

            <div className="checkbox-group">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Lembrar sempre</label>
            </div>

            <Link to="/recuperar-senha" className="forgot-password">
              Esqueci minha senha
            </Link>

          </div>

          <button
            className="btn-auth-submit"
            onClick={logar}
          >
            Login
          </button>

          <p className="auth-redirect">
            Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>

        </div>

      </div>

    </div>
  );
}