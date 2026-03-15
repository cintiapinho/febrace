import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import "../styles/palpite.css";

const Palpite: React.FC = () => {
  const navigate = useNavigate();

  const [diagnosticos] = useState<string[]>(() => {
    const salvos = localStorage.getItem("diagnosticosSalvos");
    return salvos ? JSON.parse(salvos) : [];
  });

  // Simulação do palpite do usuário (isso viria do estado anterior ou backend)
  const palpiteUsuario = ["Hipertensão arterial", "Insuficiência cardíaca"];

  return (
    <div className="palpite-layout">
      <Sidebar />
      <div className="palpite-content">
        <DashboardNavbar />
        
        <div className="palpite-container">
          <button className="voltar-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </button>

          <div className="cards-grid">
            {/* Coluna da Esquerda: IA */}
            <div className="resultado-card">
              <h3>Resultados Dr.AIgnóstico:</h3>
              <div className="botoes-lista">
                {diagnosticos.map((doenca, index) => (
                  <button 
                    key={index} 
                    className={`btn-diag cor-${index % 5}`}
                    onClick={() => navigate(`/informacoes/${doenca}`)}
                  >
                    {doenca}
                  </button>
                ))}
              </div>
            </div>

            {/* Coluna da Direita: Usuário e Avaliação */}
            <div className="coluna-direita">
              <div className="resultado-card">
                <h3>Seus Resultados:</h3>
                <div className="botoes-lista">
                  <button className="btn-diag cor-0">{palpiteUsuario[0]}</button>
                  <span className="divisor-ou">ou</span>
                  <button className="btn-diag cor-1">{palpiteUsuario[1]}</button>
                </div>
              </div>

              <div className="avaliacao-card">
                <h3>Avaliação do Diagnóstico:</h3>
                <div className="estrelas">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={30} color="#000" strokeWidth={2} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="comparacao-texto">
            <h2>Comparação de Resultados:</h2>
            <p>A análise realizada pelo Dr.AIgnóstico apresentou resultados compatíveis com a sua avaliação.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Palpite;