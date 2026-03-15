import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import "../styles/planosInternos.css";

const PlanosInterno: React.FC = () => {
  const plans = [
    { 
      id: 1, 
      title: "Pacote 50", 
      price: "25", 
      cents: ",00", 
      credits: "50", 
      unitValue: "0,50",
      current: true, 
      buttonText: "Seu Plano" 
    },
    { 
      id: 2, 
      title: "Pacote 100", 
      price: "48", 
      cents: ",00", 
      credits: "100", 
      unitValue: "0,48",
      current: false, 
      buttonText: "Assinar Agora" 
    },
    { 
      id: 3, 
      title: "Pacote 200", 
      price: "90", 
      cents: ",00", 
      credits: "200", 
      unitValue: "0,45",
      current: false, 
      buttonText: "Contratar Agora" 
    },
    { 
      id: 4, 
      title: "Pacote 300", 
      price: "129", 
      cents: ",00", 
      credits: "300", 
      unitValue: "0,43",
      current: false, 
      buttonText: "Contratar Agora" 
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <DashboardNavbar />
        
        <div className="plans-container">
          <div className="plans-grid">
            {plans.map((plan) => (
              <div key={plan.id} className="plan-card">
                {/* Título dinâmico baseado no pacote */}
                <h2 className="plan-title">{plan.title}</h2>

                <div className="plan-price">
                  <span className="currency">R$</span>
                  <span className="amount">{plan.price}</span>
                  <span className="cents">{plan.cents}</span>
                  <span className="period">/mês</span>
                </div>

                <div className="credits-badge">
                  <strong>{plan.credits}</strong>
                  <span>Consultas</span>
                </div>

                <div className="features-grid">
                  {/* Exibindo o valor unitário como uma feature/benefício */}
                  <div className="feature-item"><span>✔</span> R$ {plan.unitValue} por consulta</div>
                  <div className="feature-item"><span>✔</span> Suporte Prioritário</div>
                  <div className="feature-item"><span>✔</span> Relatórios Detalhados</div>
                  <div className="feature-item"><span>✔</span> Acesso Vitalício</div>
                </div>

                <button className={`btn-plan ${plan.current ? 'current' : ''}`}>
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanosInterno;