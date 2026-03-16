import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { Camera, Eye, EyeOff, User } from "lucide-react";
import "../styles/perfil.css";

const Perfil: React.FC = () => {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [crm, setCrm] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const usuarioId = localStorage.getItem("usuarioId");

  // =========================
  // CARREGAR DADOS
  // =========================

  useEffect(() => {

    if (!usuarioId) {
      console.log("Usuário não logado");
      return;
    }

    const carregarUsuario = async () => {

      try {

        const resposta = await fetch(`http://localhost:8000/usuario/${usuarioId}`);

        const data = await resposta.json();

        if (resposta.ok) {

          setNome(data.nome);
          setEmail(data.email);
          setCrm(data.crm);

          setSenha("******");

        } else {
          console.log(data.erro);
        }

      } catch (erro) {
        console.error("Erro ao carregar perfil", erro);
      }

    };

    carregarUsuario();

  }, [usuarioId]);



  interface PerfilUpdate {
    nome: string
    email: string
    crm: string
    senha?: string
  }

  // =========================
  // SALVAR PERFIL
  // =========================

  const salvarPerfil = async () => {

    if (!usuarioId) {
      alert("Usuário não encontrado");
      return;
    }

    const body: PerfilUpdate = {
      nome,
      email,
      crm
    };

    if (senha !== "******" && senha !== "") {
      body.senha = senha;
    }

    try {

      const resposta = await fetch(`http://localhost:8000/usuario/${usuarioId}`, {

        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(body)

      });

      const data = await resposta.json();

      if (resposta.ok) {

        alert("Perfil atualizado com sucesso!");

      } else {

        alert(data.erro);

      }

    } catch (erro) {

      console.error("Erro ao atualizar perfil", erro);

    }

  };



  return (

    <div className="dashboard-layout">

      <Sidebar />

      <main className="main-content">

        <DashboardNavbar />

        <div className="perfil-page-container">

          <div className="perfil-blue-header">

            <div className="profile-avatar-wrapper">

              <div className="avatar-circle">
                <User size={80} color="#ccc" />
              </div>

              <button className="btn-edit-photo">
                <Camera size={16} />
              </button>

            </div>

          </div>

          <div className="profile-form-card">

            <div className="profile-form-grid">

              <div className="input-group full-width">

                <label>Nome:</label>

                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

              </div>

              <div className="input-group full-width">

                <label>Email:</label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>

              <div className="input-row">

                <div className="input-group">

                  <label>CRM:</label>

                  <input
                    type="text"
                    value={crm}
                    onChange={(e) => setCrm(e.target.value)}
                  />

                </div>

                <div className="input-group">

                  <label>Senha:</label>

                  <div className="password-wrapper">

                    <input
                      type={mostrarSenha ? "text" : "password"}
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      placeholder="Nova senha"
                    />

                    {mostrarSenha ? (
                      <EyeOff
                        size={18}
                        className="eye-icon"
                        onClick={() => setMostrarSenha(false)}
                      />
                    ) : (
                      <Eye
                        size={18}
                        className="eye-icon"
                        onClick={() => setMostrarSenha(true)}
                      />
                    )}

                  </div>

                </div>

              </div>

            </div>

            <div className="form-footer">

              <button
                className="btn-save-profile"
                onClick={salvarPerfil}
              >
                Salvar
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>

  );

};

export default Perfil;