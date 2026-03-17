from dotenv import load_dotenv
load_dotenv(override=True)

from app.config import DATABASE_URL
from sqlalchemy import create_engine, text

print("Conectando ao banco:", DATABASE_URL)

e = create_engine(DATABASE_URL)

with e.connect() as conn:
    conn.execute(text("""
        CREATE TABLE IF NOT EXISTS perguntas_rag (
            id INT AUTO_INCREMENT PRIMARY KEY,
            pergunta TEXT NOT NULL,
            resposta TEXT,
            fontes TEXT,
            criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """))
    conn.commit()
    print("Tabela perguntas_rag criada (ou ja existia)!")

    r = conn.execute(text("SHOW TABLES"))
    tabelas = [row[0] for row in r]
    print("Tabelas no banco:", tabelas)

    # Teste de insert
    conn.execute(text("""
        INSERT INTO perguntas_rag (pergunta, resposta, fontes)
        VALUES (:p, :r, :f)
    """), {"p": "teste", "r": "teste resposta", "f": "fonte1"})
    conn.commit()
    print("Insert de teste OK!")

    result = conn.execute(text("SELECT COUNT(*) FROM perguntas_rag"))
    print("Registros em perguntas_rag:", result.fetchone()[0])
