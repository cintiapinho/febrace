from sqlalchemy import create_engine, text
from app.config import DATABASE_URL
from datetime import datetime
from http import HTTPStatus
from flask import abort
from app.rag import criar_chain_rag
import traceback

engine = create_engine(DATABASE_URL)

# Inicializa RAG
try:
    rag_chain = criar_chain_rag()
    if rag_chain is None:
        print("⚠️ RAG chain não foi carregado corretamente!")
except Exception:
    rag_chain = None
    print("⚠️ Erro ao inicializar RAG:")
    traceback.print_exc()

def gerarRespostasLLM(question: str, context: str = ""):
    """
    Recebe question e context separados, chama o RAG chain e retorna JSON
    """
    if not question.strip():
        return {"erro": "Pergunta vazia"}, 400

    if rag_chain is None:
        return {"erro": "RAG não carregado"}, 500

    try:
        # 🔧 CORREÇÃO PRINCIPAL
        output = rag_chain.invoke({"input": question})

        resposta = None
        fontes = []

        if isinstance(output, dict):
            resposta = output.get("answer") or output.get("result")
            docs = output.get("context") or output.get("source_documents", [])

            for doc in docs:
                meta = getattr(doc, 'metadata', {}) if not isinstance(doc, dict) else doc.get('metadata', {})
                fontes.append(f"{meta.get('categoria','')}/{meta.get('arquivo','')}")

        else:
            resposta = str(output)

        if not resposta:
            return {"erro": "LLM não retornou resposta"}, 500

        # Salva no banco
        try:
            with engine.connect() as conn:
                result = conn.execute(
                    text("""
                        INSERT INTO perguntas_rag (pergunta, resposta, fontes)
                        VALUES (:pergunta, :resposta, :fontes)
                    """),
                    {
                        "pergunta": question,
                        "resposta": resposta,
                        "fontes": ", ".join(fontes)
                    }
                )
                conn.commit()

                return {
                    "id": getattr(result, "lastrowid", None),
                    "resposta": resposta,
                    "fontes": fontes
                }

        except Exception as sql_error:
            print("ERRO SQL:", sql_error)
            return {
                "resposta": resposta,
                "fontes": fontes,
                "aviso": "Não salvo no banco"
            }

    except Exception as e:
        print("ERRO NO SERVICE:", traceback.format_exc())
        return {"erro": str(e)}, 500


# ==============================
# FUNÇÕES AUXILIARES
# ==============================

def obterDados(id):
    with engine.connect() as conn:
        result = conn.execute(
            text("SELECT id, criado_em, pergunta, resposta FROM perguntas_rag WHERE id = :id"),
            {"id": id}
        ).fetchone()

        if result is None:
            abort(HTTPStatus.BAD_REQUEST, "Documento não encontrado.")

        return {
            "id": result.id,
            "data": result.criado_em.isoformat() if isinstance(result.criado_em, datetime) else str(result.criado_em),
            "resposta": result.resposta
        }


def listarTodos():
    with engine.connect() as conn:
        results = conn.execute(
            text("SELECT id, criado_em, pergunta, resposta FROM perguntas_rag ORDER BY criado_em DESC")
        ).fetchall()

        lista = []

        for row in results:
            lista.append({
                "id": row.id,
                "data": row.criado_em.isoformat() if isinstance(row.criado_em, datetime) else str(row.criado_em),
                "pergunta": row.pergunta,
                "resposta": row.resposta
            })

        return {"Dados": lista}


def atualizarResposta(id):
    if rag_chain is None:
        return {"erro": "RAG não carregado"}, 500

    with engine.connect() as conn:

        result = conn.execute(
            text("SELECT pergunta FROM perguntas_rag WHERE id = :id"),
            {"id": id}
        ).fetchone()

        if result is None:
            abort(HTTPStatus.BAD_REQUEST, "Documento não encontrado.")

        pergunta = result.pergunta

        try:
            # 🔧 CORREÇÃO AQUI TAMBÉM
            nova_saida = rag_chain.invoke({"input": pergunta})

            if isinstance(nova_saida, dict):
                novaResposta = nova_saida.get("result") or nova_saida.get("answer")
            else:
                novaResposta = str(nova_saida)

            conn.execute(
                text("""
                    UPDATE perguntas_rag
                    SET resposta = :resposta
                    WHERE id = :id
                """),
                {
                    "resposta": novaResposta,
                    "id": id
                }
            )

            conn.commit()

            return {"Mensagem": "Resposta atualizada com sucesso."}

        except Exception as e:
            tb = traceback.format_exc()
            print("ERRO ao atualizar resposta:", tb)

            return {
                "erro": str(e),
                "detalhes": tb
            }, 500


def deletarRegistro(id):
    with engine.connect() as conn:

        result = conn.execute(
            text("DELETE FROM perguntas_rag WHERE id = :id"),
            {"id": id}
        )

        conn.commit()

        if result.rowcount == 0:
            abort(HTTPStatus.BAD_REQUEST, "Documento não encontrado.")

        return {"Mensagem": "Registro deletado com sucesso."}
