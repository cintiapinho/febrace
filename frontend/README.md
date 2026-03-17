# 🖥️ Frontend — DrAignostico

Interface web do sistema de apoio ao diagnóstico clínico, construída com **React 19 + TypeScript + Vite**.

---

## 📁 Estrutura

```
frontend/src/
├── App.tsx           # Roteamento principal (React Router DOM)
├── main.tsx          # Ponto de entrada da aplicação
├── index.css         # Estilos globais
├── App.css
│
├── pages/            # Telas da aplicação
│   ├── Home.tsx          # Landing page
│   ├── Login.tsx         # Autenticação
│   ├── Cadastro.tsx      # Registro de médico
│   ├── RecuperarSenha.tsx
│   ├── Dashboard.tsx     # Painel principal pós-login
│   ├── Diagnosticos.tsx  # Histórico de diagnósticos
│   ├── Analise.tsx       # Consulta RAG (tela principal)
│   ├── Pesquisar.tsx     # Busca de doenças
│   ├── Informacoes.tsx   # Detalhes de uma doença (/informacoes/:doenca)
│   ├── Palpite.tsx       # Módulo de sugestão avançada
│   ├── Anotacoes.tsx     # Anotações do médico
│   ├── Planos.tsx        # Planos (público)
│   ├── PlanosInterno.tsx # Planos (autenticado)
│   ├── Perfil.tsx        # Perfil do médico
│   └── Suporte.tsx       # Suporte ao usuário
│
├── components/       # Componentes reutilizáveis
└── styles/           # Estilos CSS por página/componente
```

---

## 🗺️ Rotas

| Rota                     | Página         | Acesso       |
|--------------------------|----------------|--------------|
| `/`                      | Home           | Público      |
| `/login`                 | Login          | Público      |
| `/cadastro`              | Cadastro       | Público      |
| `/recuperar-senha`       | RecuperarSenha | Público      |
| `/planos`                | Planos         | Público      |
| `/dashboard`             | Dashboard      | Autenticado  |
| `/diagnostico`           | Diagnosticos   | Autenticado  |
| `/analise`               | Analise        | Autenticado  |
| `/pesquisar`             | Pesquisar      | Autenticado  |
| `/informacoes/:doenca`   | Informacoes    | Autenticado  |
| `/palpite`               | Palpite        | Autenticado  |
| `/anotacoes`             | Anotacoes      | Autenticado  |
| `/planosinterno`         | PlanosInterno  | Autenticado  |
| `/perfil`                | Perfil         | Autenticado  |
| `/suporte`               | Suporte        | Autenticado  |

---

## 🚀 Como Rodar

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento (http://localhost:5173)
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

---

## 📡 Comunicação com o Backend

O frontend se comunica com a API em `http://localhost:8000`.

**Endpoint principal:**

```typescript
// POST /respostas-llm
const response = await fetch("http://localhost:8000/respostas-llm", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    question: "sintomas do paciente...",
    context: "informações adicionais..."
  })
});

const data = await response.json();
// data.resposta → string com diagnósticos diferenciais
```

---

## 🧰 Dependências Principais

| Pacote              | Versão  | Uso                              |
|---------------------|---------|----------------------------------|
| react               | 19.x    | Framework UI                     |
| react-dom           | 19.x    | Renderização DOM                 |
| react-router-dom    | 7.x     | Roteamento SPA                   |
| lucide-react        | 0.574.x | Ícones                           |
| typescript          | 5.9.x   | Tipagem estática                 |
| vite                | 7.x     | Build tool + dev server          |