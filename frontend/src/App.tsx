// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import RecuperarSenha from "./pages/RecuperarSenha";
import Analise from "./pages/Analise";

import Dashboard from "./pages/Dashboard";
import Diagnostico from "./pages/Diagnosticos";
import Pesquisar from "./pages/Pesquisar";
import Informacoes from "./pages/Informacoes";
import Planos  from "./pages/Planos";
import Palpite from "./pages/Palpite";

// Novas Páginas Internas
import Anotacoes from "./pages/Anotacoes";
import PlanosInterno from "./pages/PlanosInterno";
import Perfil from "./pages/Perfil";
import Suporte from "./pages/Suporte";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/analise" element={<Analise />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/palpite" element={<Palpite />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/diagnostico" element={<Diagnostico />} />
        <Route path="/pesquisar" element={<Pesquisar />} />
        <Route path="/informacoes/:doenca" element={<Informacoes />} />
        <Route path="/anotacoes" element={<Anotacoes />} />
        <Route path="/planosinterno" element={<PlanosInterno />} />
        <Route path="/perfil" element={<Perfil />} />



        <Route path="/suporte" element={<Suporte />} />
      </Routes>
    </Router>
  );
}

export default App;
