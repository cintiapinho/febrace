import React from 'react';
import { Link } from 'react-router-dom';
import medicoRecSenha from "../img/medicopagrecsenha.jpeg";
import "../styles/auth.css";

const EsqueceuSenha: React.FC = () => {
  return (
    <div className="flex h-screen w-full font-sans">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-24 bg-white relative">
        <Link to="/login" className="absolute top-10 left-10 text-3xl font-bold text-black">←</Link>
        <h1 className="text-4xl font-bold mb-8 text-black text-center">Recuperar Senha</h1>
        <form className="w-full max-w-sm space-y-4">
          <input type="text" placeholder="CRM" className="w-full p-3 bg-[#fdf8f8] border border-gray-100 rounded-xl outline-none" />
          <input type="email" placeholder="Email" className="w-full p-3 bg-[#fdf8f8] border border-gray-100 rounded-xl outline-none" />
          <button type="button" className="w-full bg-[#003366] text-white p-4 rounded-xl font-bold mt-6 hover:bg-blue-900 transition">Enviar</button>
        </form>
      </div>
      <div className="hidden md:flex md:w-1/2 bg-[#0056b3] items-center justify-center p-12">
         <img src={medicoRecSenha} alt="Recuperação" className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default EsqueceuSenha;