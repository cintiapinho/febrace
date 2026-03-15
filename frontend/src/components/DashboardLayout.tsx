// // src/components/DashboardLayout.tsx
// import React from 'react';
// import { Link, useLocation } from 'react-router-dom'; 
// import '../styles/dashboard.css';
// import userPlaceholder from '../img/flaviofoto.jpeg'; 

// interface DashboardLayoutProps {
//   children: React.ReactNode;
// }

// export default function DashboardLayout({ children }: DashboardLayoutProps) {
//   const location = useLocation();
//   const isActive = (path: string) => location.pathname === path ? 'active' : '';

//   return (
//     <div className="dashboard-container">
//       <aside className="sidebar">
        
        
//         <div className="sidebar-settings-icon" style={{padding: '0 20px', marginBottom: '20px'}}>
//             <Link to="/suporte" style={{cursor: 'pointer'}}>
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
//                     <circle cx="12" cy="12" r="3"></circle>
//                     <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
//                 </svg>
//             </Link>
//         </div>
        
        
//         <div className="sidebar-profile">
//           <div className="sidebar-avatar">
//             <img src={userPlaceholder} alt="User" />
//           </div>
//           <span className="user-badge">NOME USUÁRIO</span>
//         </div>

//         <nav className="sidebar-nav">
//           <Link to="/home-interna" className={`nav-item ${isActive('/home-interna')}`}>Home</Link>
//           <Link to="/diagnosticos" className={`nav-item ${isActive('/diagnosticos')}`}>Diagnósticos</Link>
//           <Link to="/dados" className={`nav-item ${isActive('/dados')}`}>Dados</Link>
//           <Link to="/anotacoes" className={`nav-item ${isActive('/anotacoes')}`}>Anotações</Link>
//           <Link to="/planos-interno" className={`nav-item ${isActive('/planos-interno')}`}>Planos</Link>
//           <Link to="/perfil" className={`nav-item ${isActive('/perfil')}`}>Perfil</Link>
//         </nav>
//       </aside>

//       <div className="main-content">
//         <header className="top-header">
//           <div className="header-title">Dr.<strong>Al</strong>gnóstico</div>
//           <div className="header-actions">
//             <select className="lang-selector">
//               <option>Português</option>
//               <option>English</option>
//             </select>
//             <span className="notif-icon">🔔</span>
//           </div>
//         </header>

//         <div className="page-body">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }