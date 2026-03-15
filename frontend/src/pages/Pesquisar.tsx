import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import "../styles/pesquisar.css";

const Pesquisar: React.FC = () => {
  const [doenca, setDoenca] = useState("");
  const navigate = useNavigate();

  const pesquisarDoenca = () => {
    if (!doenca.trim()) {
      alert("Digite o nome da doença.");
      return;
    }
    // Navega para a tela de informações da doença digitada
    navigate(`/informacoes/${doenca}`);
  };

  return (
    <div className="pesquisar-layout">
      <Sidebar />

      <div className="pesquisar-content">
        <DashboardNavbar />

        <div className="pesquisar-container">
          <div className="pesquisar-card">
            <h3>Informação sobre as doenças:</h3>

            <input
              type="text"
              className="pesquisar-select" // Usando a mesma classe de estilo do input/select anterior
              placeholder="Digite o nome da doença (ex: Diabetes)"
              value={doenca}
              onChange={(e) => setDoenca(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && pesquisarDoenca()} // Permite pesquisar ao dar Enter
            />

            <button className="pesquisar-btn" onClick={pesquisarDoenca}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pesquisar;