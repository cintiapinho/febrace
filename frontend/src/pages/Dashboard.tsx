import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardNavbar from '../components/DashboardNavbar';
import '../styles/dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dash-layout">
      <Sidebar />
      <div className="dash-main">
        <DashboardNavbar />
        
        <div className="dash-content">
          {}
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-header">Total de Diagnósticos</div>
              <div className="stat-body">
                <span className="stat-number">100</span>
                <span className="stat-unit">p/mês.</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">Concordância Clínica</div>
              <div className="stat-body">
                <span className="stat-number">60%</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">Otimização de Tempo</div>
              <div className="stat-body">
                <span className="stat-number">37,5%</span>
              </div>
            </div>
          </div>

          <div className="charts-row">
            <div className="chart-container-card">
              <div className="chart-header-dark">Comparação dos Resultados</div>
              <div className="chart-content">
                <div className="placeholder-circle">gráfico</div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <span className="legend-dot dark"></span> Seus Palpites
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot light"></span> Dr. Algnóstico
                  </div>
                </div>
              </div>
            </div>

            <div className="stat-card risk-card">
              <div className="stat-header">Classificação de Risco</div>
              <div className="stat-body">
                <span className="stat-number">20%</span>
                <p className="stat-desc">Casos moderados ou alto risco.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;