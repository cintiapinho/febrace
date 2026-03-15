import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import "../styles/anotacoes.css";

const mockReports = [
  { id: 18, date: "09/05/2025" },
  { id: 17, date: "08/05/2025" },
  { id: 16, date: "07/05/2025" },
  { id: 15, date: "06/05/2025" },
  { id: 14, date: "05/05/2025" },
  { id: 13, date: "04/05/2025" },
];

const Anotacoes: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="main-content">
        <DashboardNavbar />

        <div className="anotacoes-page">
          <header className="anotacoes-header">
            <button className="btn-add-notes" onClick={() => setIsModalOpen(true)}>
              Adicionar Anotações
            </button>
          </header>

          <div className="reports-grid">
            {mockReports.map((report) => (
              <div key={report.id} className="report-card">
                <div className="card-body">
                  <div className="card-info">
                    <h3>Relatório {report.id}</h3>
                    <p>Data da sessão: {report.date}</p>
                  </div>
                  <div className="file-icon-wrapper">
                    <svg width="45" height="55" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" fill="#3ABEF9"/>
                      <circle cx="18" cy="18" r="5" fill="white"/>
                      <path d="M18 15V21M18 21L16 19M18 21L20 19" stroke="#3ABEF9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                <button className="btn-download">
                  Download
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {}
    </div>
  );
};

export default Anotacoes;