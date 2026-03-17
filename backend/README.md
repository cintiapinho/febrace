# 🔧 Backend — DrAignostico

API Flask com sistema RAG para diagnóstico médico diferencial.

---

## 📁 Estrutura

```
backend/
├── app/
│   ├── __init__.py      # Factory da aplicação Flask
│   ├── config.py        # Variáveis de ambiente (DB, paths)
│   ├── database.py      # Sessão SQLAlchemy
│   ├── models.py        # Modelos ORM (Usuario, HistoricoDiagnostico)
│   ├── auth.py          # Lógica de autenticação
│   ├── rag.py           # Criação da chain RAG com LangChain
│   └── api/
│       ├── __init__.py
│       └── services/    # Serviços de negócio (gerarRespostasLLM)
├── dados/               # PDFs médicos — base de conhecimento do RAG
├── vetores_doencas/     # Índice FAISS (gerado pelo vetorizador)
├── vetorizador.py       # Script de indexação dos PDFs
├── run.py               # Ponto de entrada da API
├── setup.py             # Script de configuração inicial
├── sistema_diagnostico.sql  # Schema do banco de dados
└── requirements.txt
```

---

## 🌐 Endpoints da API

| Método | Rota                  | Descrição                                      |
|--------|-----------------------|------------------------------------------------|
| GET    | `/`                   | Status da API e lista de rotas                 |
| POST   | `/cadastro`           | Cadastrar novo usuário (médico)                |
| POST   | `/login`              | Autenticar usuário                             |
| POST   | `/recuperar-senha`    | Redefinir senha via CRM + email                |
| GET    | `/usuario/<id>`       | Buscar perfil do usuário                       |
| PUT    | `/usuario/<id>`       | Atualizar perfil do usuário                    |
| POST   | `/respostas-llm`      | **Consulta RAG — diagnóstico diferencial**     |

### Exemplo: POST `/respostas-llm`

**Requisição:**
```json
{
  "question": "Paciente com febre alta, rigidez de nuca e fotofobia",
  "context": "Paciente masculino, 25 anos, sem comorbidades"
}
```

**Resposta:**
```json
{
  "resposta": "1. Meningite bacteriana\n2. Meningite viral\n3. Encefalite\n4. Hemorragia subaracnóidea\n5. Síndrome de Stevens-Johnson"
}
```

---

## 🧠 Como Funciona o RAG

O sistema RAG segue o seguinte pipeline:

```
PDFs médicos (pasta dados/)
        ↓  vetorizador.py
Chunks de texto (800 chars, overlap 150)
        ↓
Embeddings (all-MiniLM-L6-v2)
        ↓
Índice FAISS (vetores_doencas/)
        ─────────────────────────
        ↓  a cada requisição
Pergunta do médico
        ↓
Busca de similaridade (top-5 chunks)
        ↓
Prompt + Contexto → ChatGroq (Llama 3.1 8B)
        ↓
Diagnósticos diferenciais
```

### Componentes

| Componente       | Valor                                        |
|------------------|----------------------------------------------|
| Embeddings       | `sentence-transformers/all-MiniLM-L6-v2`     |
| Vectorstore      | FAISS (local)                                |
| Retriever        | similarity search, k=5                       |
| LLM              | `llama-3.1-8b-instant` via Groq              |
| Temperatura      | 0 (respostas determinísticas)                |
| Chunk Size       | 800 caracteres                               |
| Chunk Overlap    | 150 caracteres                               |

---

## 🗄️ Banco de Dados

**MySQL — banco `sistema_diagnostico`**

### Tabela `usuarios`
| Campo       | Tipo         | Descrição                   |
|-------------|--------------|-----------------------------|
| id          | INT (PK)     | Identificador único          |
| nome        | VARCHAR(100) | Nome completo do médico      |
| crm         | VARCHAR(20)  | CRM do médico                |
| email       | VARCHAR(150) | Email único                  |
| senha       | VARCHAR(255) | Hash bcrypt da senha         |
| criado_em   | DATETIME     | Data de criação              |

### Tabela `historico_diagnostico`
| Campo       | Tipo     | Descrição                        |
|-------------|----------|----------------------------------|
| id          | INT (PK) | Identificador único               |
| usuario_id  | INT (FK) | Referência ao médico              |
| sintomas    | TEXT     | Sintomas descritos                |
| resposta_ia | TEXT     | Diagnósticos sugeridos pela IA    |
| criado_em   | DATETIME | Data da consulta                  |

---

## ⚙️ Variáveis de Ambiente (`.env`)

```env
# Groq LLM
GROQ_API_KEY=gsk_...

# Banco de Dados MySQL
DB_USER=root
DB_PASSWORD=senha
DB_HOST=localhost
DB_PORT=3306
DB_NAME=sistema_diagnostico
```

---

## 📦 Primeiros Passos

```bash
# 1. Ativar ambiente virtual
venv\Scripts\activate

# 2. Instalar dependências
pip install -r requirements.txt

# 3. Criar banco de dados
mysql -u root -p < sistema_diagnostico.sql

# 4. Vetorizar os PDFs (necessário apenas uma vez)
python vetorizador.py

# 5. Iniciar o servidor
python run.py
```

> ⚠️ O servidor falha ao iniciar se o índice FAISS não existir.  
> Execute `python vetorizador.py` com PDFs na pasta `dados/` antes de iniciar.
