import "../styles/auth.css";
import doctorThinking from "../img/medicapaganalise.png"; 

export default function Analise() {
  return (
    <div className="analysis-page">
      <div className="analysis-top-blue">
        <img
          src={doctorThinking}
          alt="Médica analisando"
          style={{ height: "80%" }}
        />
      </div>
      <div className="analysis-bottom-white">
        <h1>Seus dados estão em análise</h1>
        <p>Enviaremos um email para você confirmando o status</p>
      </div>
    </div>
  );
}
