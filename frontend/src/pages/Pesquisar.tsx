import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import "../styles/pesquisar.css";

interface Pesquisa {
  id: number;
  termo_pesquisa: string;
  criado_em: string;
}

const Pesquisar: React.FC = () => {
  const [doenca, setDoenca] = useState("");
  const [historico, setHistorico] = useState<Pesquisa[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarHistorico = async () => {
      try {
        const usuarioStr = localStorage.getItem("usuario");
        if (!usuarioStr) return;

        const usuario = JSON.parse(usuarioStr);
        const res = await fetch(`http://localhost:8000/pesquisas/${usuario.id}`);
        if (res.ok) {
          const data = await res.json();
          setHistorico(data);
        }
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
      }
    };

    carregarHistorico();
  }, []);

  const pesquisarDoenca = async () => {
    if (!doenca.trim()) {
      alert("Digite o nome da doença.");
      return;
    }

    try {
      const usuarioStr = localStorage.getItem("usuario");
      if (usuarioStr) {
        const usuario = JSON.parse(usuarioStr);
        // Salva a pesquisa no banco de dados sem bloquear a navegação
        await fetch("http://localhost:8000/pesquisas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario_id: usuario.id,
            termo_pesquisa: doenca.trim()
          }),
        });
      }
    } catch (error) {
      console.error("Erro ao salvar pesquisa:", error);
    }

    // Navega para a tela de informações da doença digitada
    navigate(`/informacoes/${doenca.trim()}`);
  };

  const clicarHistorico = (termo: string) => {
    navigate(`/informacoes/${termo}`);
  }

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

          {historico.length > 0 && (
            <div className="historico-pesquisas">
              <h4>Suas pesquisas recentes</h4>
              <ul className="historico-lista">
                {historico.map((item) => (
                  <li key={item.id} onClick={() => clicarHistorico(item.termo_pesquisa)}>
                    <span className="termo">{item.termo_pesquisa}</span>
                    <span className="data">{item.criado_em}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Pesquisar;