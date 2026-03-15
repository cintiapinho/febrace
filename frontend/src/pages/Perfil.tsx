import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { Camera, Eye, User } from "lucide-react";
import "../styles/perfil.css";

const Perfil: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="main-content">
        <DashboardNavbar />

        <div className="perfil-page-container">
          {}
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

          {/* Card do Formulário */}
          <div className="profile-form-card">
            <div className="profile-form-grid">
              <div className="input-group full-width">
                <label>Nome:</label>
                <input type="text" defaultValue="Luiz da Silva Pereira" />
              </div>

              <div className="input-group full-width">
                <label>Email:</label>
                <input type="email" defaultValue="luizmedico@gmail.com" />
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>CRM:</label>
                  <input type="text" defaultValue="00000010" />
                </div>

                <div className="input-group">
                  <label>Senha:</label>
                  <div className="password-wrapper">
                    <input type="password" defaultValue="**********" />
                    <Eye size={18} className="eye-icon" />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-footer">
              <button className="btn-save-profile">Salvar</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Perfil;