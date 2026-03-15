import React from 'react';
import '../styles/dashboardNavbar.css';
import { Bell, ChevronDown } from 'lucide-react';

const DashboardNavbar: React.FC = () => {
  return (
    <nav className="dash-navbar">
      <div className="dash-logo">
        Dr.<span className="dash-logo-accent">Al</span>gnóstico
      </div>
      
      <div className="dash-nav-actions">
        <div className="dash-lang-selector">
          <span>Português</span>
          <ChevronDown size={18} />
        </div>
        <div className="dash-notif-icon">
          <Bell size={22} fill="white" />
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;