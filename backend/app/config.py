import os
from dotenv import load_dotenv

load_dotenv()

# ==============================
# CONFIGURAÇÃO DO BANCO MYSQL
# ==============================

DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "sistema_diagnostico")

DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# ==============================
# CONFIGURAÇÕES DO RAG
# ==============================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DADOS_PATH = os.path.join(BASE_DIR, "dados")

FAISS_INDEX_PATH = os.path.join(BASE_DIR, "faiss_index")