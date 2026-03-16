import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";
import {
  Settings,
  User,
  Home,
  Stethoscope,
  BarChart2,
  FileText,
  CreditCard,
  UserCircle,
} from "lucide-react";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  // pegar usuário salvo no login
  const usuario = localStorage.getItem("usuario");

  let nomeMedico = "Médico";

  if (usuario) {
    const dados = JSON.parse(usuario);
    nomeMedico = dados.nome;
  }

  return (
    <aside className="app-sidebar">

      {/* Configurações */}
      <div
        className="sidebar-config"
        onClick={() => navigate("/suporte")}
      >
        <Settings size={22} className="config-icon" />
      </div>

      {/* Perfil */}
      <div className="sidebar-profile">

        <div className="profile-avatar">
          <User size={45} color="white" />
        </div>

        <div className="profile-name-tag">
          Dr. {nomeMedico}
        </div>

      </div>

      {/* Menu */}
      <nav className="sidebar-menu">

        <NavLink to="/dashboard" className="menu-item">
          <Home size={22} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/diagnostico" className="menu-item">
          <Stethoscope size={22} />
          <span>Diagnósticos</span>
        </NavLink>

        <NavLink to="/pesquisar" className="menu-item">
          <BarChart2 size={22} />
          <span>Pesquisar</span>
        </NavLink>

        <NavLink to="/anotacoes" className="menu-item">
          <FileText size={22} />
          <span>Anotações</span>
        </NavLink>

        <NavLink to="/planosinterno" className="menu-item">
          <CreditCard size={22} />
          <span>Planos</span>
        </NavLink>

        <NavLink to="/perfil" className="menu-item">
          <UserCircle size={22} />
          <span>Perfil</span>
        </NavLink>

      </nav>
    </aside>
  );
};

export default Sidebar;