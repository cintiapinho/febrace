import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import "../styles/diagnosticos.css";

const Diagnosticos: React.FC = () => {

  const navigate = useNavigate();

  const [sintomas, setSintomas] = useState("");
  const [inicioSintomas, setInicioSintomas] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [idade, setIdade] = useState("");
  const [genero, setGenero] = useState("Masculino");
  const [palpite, setPalpite] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    if (!sintomas.trim()) {
      alert("Digite pelo menos um sintoma!");
      return;
    }

    setLoading(true);

    try {

      const perguntaCompleta = `Paciente ${genero}, ${idade} anos, peso ${peso}kg, altura ${altura}m. Sintomas: ${sintomas}. Início: ${inicioSintomas}. Suspeita: ${palpite}.`;

      const response = await fetch("http://localhost:8000/respostas-llm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question: perguntaCompleta
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro || "Erro no servidor");
      }

      const doencas = data.resposta
        .split("\n")
        .filter((d: string) => d.trim());

      localStorage.setItem("diagnosticosSalvos", JSON.stringify(doencas));

      navigate("/palpite");

    } catch (error) {

      console.error(error);
      alert("Erro ao gerar diagnóstico");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="diagnosticos-layout">

      <Sidebar />

      <div className="diagnosticos-content">

        <DashboardNavbar />

        <div className="diagnosticos-container">

          <div className="card">
            <h3>Digite os Sintomas:</h3>

            <textarea
              placeholder="Digite os sintomas separados por vírgula"
              value={sintomas}
              onChange={(e) => setSintomas(e.target.value)}
            />

            <div className="input-box inicio-sintomas">
              <label>Início dos Sintomas:</label>
              <input
                type="date"
                value={inicioSintomas}
                onChange={(e) => setInicioSintomas(e.target.value)}
              />
            </div>
          </div>

          <div className="inputs-row">

            <div className="input-box">
              <label>Idade</label>
              <input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} />
            </div>

            <div className="input-box">
              <label>Peso</label>
              <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} />
            </div>

            <div className="input-box">
              <label>Altura</label>
              <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} />
            </div>

            <div className="input-box">
              <label>Gênero</label>
              <select value={genero} onChange={(e) => setGenero(e.target.value)}>
                <option>Masculino</option>
                <option>Feminino</option>
                <option>Outro</option>
              </select>
            </div>

          </div>

          <div className="palpite-card">

            <div>

              <h4>Seu Palpite</h4>

              <input
                type="text"
                placeholder="Digite a doença suspeita"
                value={palpite}
                onChange={(e) => setPalpite(e.target.value)}
              />

            </div>

            <button
              className="btn-enviar"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Analisando..." : "Enviar"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );

};

export default Diagnosticos;