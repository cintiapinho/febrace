# 🏗️ Arquitetura — DrAignostico

Visão geral da arquitetura do sistema de apoio ao diagnóstico clínico.

---

## Diagrama de Alto Nível

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                          │
│  Vite + TypeScript + React Router DOM                           │
│                                                                  │
│  /           Home (landing page)                                 │
│  /login      Autenticação do médico                              │
│  /cadastro   Registro de novo usuário                            │
│  /dashboard  Painel principal                                    │
│  /diagnostico  Histórico de diagnósticos                         │
│  /pesquisar  Busca de doenças                                    │
│  /analise    Consulta RAG (sintomas → diagnóstico)               │
│  /palpite    Módulo de sugestão avançada                         │
│  /informacoes/:doenca  Detalhes de uma doença                    │
│  /perfil     Perfil do médico                                    │
│  /anotacoes  Anotações pessoais                                  │
│  /suporte    Suporte ao usuário                                  │
└─────────────────────┬───────────────────────────────────────────┘
                       │  HTTP/JSON
                       │  POST /respostas-llm
                       │  GET/POST /login, /cadastro, etc.
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND (Flask)                           │
│  run.py — servidor principal (porta 8000)                        │
│                                                                  │
│  ┌─────────────┐   ┌──────────────┐   ┌───────────────────┐    │
│  │    Auth     │   │   Usuários   │   │   RAG / LLM       │    │
│  │  /login     │   │  /usuario    │   │  /respostas-llm   │    │
│  │  /cadastro  │   │  /perfil     │   │                   │    │
│  │  /recuperar │   │              │   │  gerarRespostasLLM│    │
│  └──────┬──────┘   └──────┬───────┘   └────────┬──────────┘    │
│         │                  │                     │               │
└─────────┼──────────────────┼─────────────────────┼─────────────┘
          │                  │                     │
          ▼                  ▼                     ▼
┌─────────────────┐ ┌──────────────────┐ ┌─────────────────────────┐
│  Flask-Bcrypt   │ │  MySQL (SQLAlch.) │ │  LangChain RAG Pipeline │
│  Hash de senha  │ │                  │ │                         │
│                 │ │  - usuarios      │ │  FAISS Vectorstore      │
│                 │ │  - historico_    │ │  (vetores_doencas/)     │
│                 │ │    diagnostico   │ │         ↓               │
└─────────────────┘ └──────────────────┘ │  HuggingFace Embeddings │
                                          │  (all-MiniLM-L6-v2)    │
                                          │         ↓               │
                                          │  Groq API              │
                                          │  (Llama 3.1 8B)        │
                                          └─────────────────────────┘
```

---

## Pipeline RAG (Detalhado)

```
FASE DE INDEXAÇÃO (offline — executar uma vez)
─────────────────────────────────────────────
PDFs médicos
    └─► PyPDFLoader (carrega páginas)
            └─► RecursiveCharacterTextSplitter
                    chunk_size=800, overlap=150
                        └─► HuggingFaceEmbeddings
                                model: all-MiniLM-L6-v2
                                    └─► FAISS.save_local()
                                            → vetores_doencas/

FASE DE CONSULTA (online — a cada requisição)
─────────────────────────────────────────────
Sintomas do médico (string)
    └─► FAISS.similarity_search(k=5)
            └─► top-5 chunks relevantes
                    └─► PromptTemplate
                            {input} = sintomas
                            {context} = chunks recuperados
                                └─► ChatGroq (Llama 3.1 8B, temp=0)
                                        └─► Lista de diagnósticos diferenciais
```

---

## Decisões de Design

| Decisão | Escolha | Justificativa |
|---------|---------|---------------|
| Embeddings | HuggingFace local (`all-MiniLM-L6-v2`) | Sem custo por token, roda offline |
| Vectorstore | FAISS | Alta performance, simples de usar |
| LLM | Groq / Llama 3.1 | Gratuito, baixa latência |
| Temperatura | 0 | Respostas médicas devem ser determinísticas |
| Chunks | 800 chars, overlap 150 | Balanceia contexto e precisão de recuperação |
| Banco | MySQL | Suporte a dados estruturados de usuários |
| Autenticação | bcrypt | Hash seguro para senhas médicas |
| Frontend | React + Vite + TypeScript | Desenvolvimento rápido, tipagem segura |

---

## Fluxo de Autenticação

```
Médico
  │
  ├─► POST /cadastro  (nome, email, senha, crm)
  │       └─► bcrypt.hash(senha) → DB
  │
  └─► POST /login  (email, senha)
          └─► bcrypt.verify → retorna {id, nome, email}
```

> **Nota:** O sistema não utiliza JWT atualmente. O estado de autenticação é gerenciado no frontend via estado React/localStorage.

---

## Estrutura de Arquivos Principais

```
backend/app/
├── __init__.py      # create_app() — factory do Flask + registro da rota /perguntar
├── config.py        # DATABASE_URL, DADOS_PATH, FAISS_INDEX_PATH
├── database.py      # engine + SessionLocal + Base declarativa
├── models.py        # ORM: Usuario, HistoricoDiagnostico
├── auth.py          # Helpers de autenticação
├── rag.py           # criar_chain_rag() — monta a chain LangChain
└── api/
    ├── __init__.py  # Blueprint Flask
    └── services/
        └── services.py  # gerarRespostasLLM()

frontend/src/
├── App.tsx          # Roteamento principal (React Router)
├── pages/           # Uma pasta por tela da aplicação
├── components/      # Componentes reutilizáveis (header, sidebar, etc.)
└── styles/          # CSS por componente/página
```
