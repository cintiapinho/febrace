# 🩺 DrAignostico

> Sistema de apoio ao diagnóstico clínico baseado em RAG (Retrieval-Augmented Generation) para uso por médicos.

O DrAignostico combina uma interface web moderna em React com um backend Python que utiliza inteligência artificial para sugerir diagnósticos diferenciais a partir dos sintomas do paciente, consultando uma base de documentos médicos vetorizados.

---

## 📁 Estrutura do Projeto

```
febrace/
├── backend/          # API Flask + Motor RAG
│   ├── app/          # Código principal da aplicação
│   ├── dados/        # PDFs médicos (base de conhecimento)
│   ├── vetores_doencas/  # Índice FAISS gerado pelo vetorizador
│   ├── vetorizador.py    # Script de indexação dos PDFs
│   ├── run.py        # Servidor principal Flask
│   └── requirements.txt
│
└── frontend/         # Interface React + TypeScript
    ├── src/
    │   ├── pages/    # Telas da aplicação
    │   ├── components/ # Componentes reutilizáveis
    │   └── styles/   # Estilos CSS
    └── package.json
```

---

## 🚀 Como Iniciar o Projeto

### Pré-requisitos

- **Python 3.10+**
- **Node.js 18+**
- **MySQL** rodando localmente
- **Chave de API Groq** (gratuita em [console.groq.com](https://console.groq.com))

---

### 1. Configurar o Backend

```bash
cd backend
```

**Criar ambiente virtual e instalar dependências:**
```bash
python -m venv venv
venv\Scripts\activate       # Windows
pip install -r requirements.txt
```

**Configurar variáveis de ambiente:**

Crie um arquivo `.env` em `backend/` com:
```env
GROQ_API_KEY=sua_chave_aqui
DB_USER=root
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=3306
DB_NAME=sistema_diagnostico
```

**Criar o banco de dados:**
```bash
mysql -u root -p < sistema_diagnostico.sql
```

**Vetorizar os documentos médicos (executar uma vez):**
```bash
python vetorizador.py
```

**Iniciar o servidor:**
```bash
python run.py
```

A API estará disponível em: `http://localhost:8000`

---

### 2. Configurar o Frontend

```bash
cd frontend
npm install
npm run dev
```

A interface estará disponível em: `http://localhost:5173`

---

## 🔄 Fluxo do Sistema

```
Médico digita sintomas
        ↓
Frontend (React)
        ↓  POST /respostas-llm
Backend (Flask)
        ↓
Busca vetorial FAISS (top-5 documentos relevantes)
        ↓
LLM Groq / Llama 3.1 8B
        ↓
Retorna até 5 diagnósticos diferenciais
        ↓
Exibição na interface
```

---

## 🛠️ Tecnologias

| Camada      | Tecnologia                                     |
|-------------|------------------------------------------------|
| Frontend    | React 19, TypeScript, Vite, React Router DOM   |
| Backend     | Python, Flask, Flask-CORS, Flask-Bcrypt        |
| RAG         | LangChain, FAISS, HuggingFace Embeddings       |
| LLM         | Groq API (Llama 3.1 8B Instant)                |
| Banco       | MySQL + SQLAlchemy                             |
| Embeddings  | sentence-transformers/all-MiniLM-L6-v2         |

---

## 📄 Documentação Adicional

- [Backend — Detalhes da API e RAG](backend/README.md)
- [Arquitetura do Sistema](ARCHITECTURE.md)
