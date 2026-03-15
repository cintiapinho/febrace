import React from 'react';
import { Link } from 'react-router-dom';
import medicoLogin from "../img/medicopaginalogin.jpeg";

const PaginaLogin: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', fontFamily: 'Inter, sans-serif' }}>
      {}
      <div style={{ flex: 1, backgroundColor: '#0b2f8a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={medicoLogin} alt="Médico" style={{ maxWidth: '80%', height: 'auto' }} />
      </div>

      {}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 40px', backgroundColor: '#fff' }}>
        <h1 style={{ color: '#0b2f8a', fontSize: '36px', marginBottom: '30px', fontWeight: 'bold' }}>Login</h1>
        <form style={{ width: '100%', maxWidth: '350px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="email" placeholder="Digite seu email" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e5e5e5', backgroundColor: '#fdf8f8' }} />
          <input type="password" placeholder="Digite sua senha" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e5e5e5', backgroundColor: '#fdf8f8' }} />
          <Link to="/recuperar" style={{ textAlign: 'right', fontSize: '14px', color: '#333', textDecoration: 'none' }}>Esqueci minha senha</Link>
          <button type="button" style={{ padding: '15px', backgroundColor: '#0b2f8a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>Login</button>
        </form>
        <p style={{ marginTop: '20px', fontSize: '14px' }}>Não tem uma conta? <Link to="/cadastro" style={{ color: '#0066e6', fontWeight: 'bold', textDecoration: 'none' }}>Cadastre-se</Link></p>
      </div>
    </div>
  );
};

export default PaginaLogin;