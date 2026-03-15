from flask import Flask, request, jsonify
from flask_cors import CORS
from app.api import api_bp


def create_app():
    app = Flask(__name__)

    # ===============================
    # INICIALIZAR RAG
    # ===============================
    from .rag import criar_chain_rag

    qa_chain = criar_chain_rag()

    if not qa_chain:
        raise RuntimeError(
            "❌ Falha ao inicializar RAG. Execute python vetorizador.py primeiro!"
        )

    print("✅ Sistema RAG carregado com sucesso!")

    # ===============================
    # CONFIGURAÇÕES
    # ===============================
    CORS(app)
    app.register_blueprint(api_bp)

    # ===============================
    # ROTA RAG
    # ===============================
    @app.route("/perguntar", methods=["POST"])
    def fazer_pergunta():
        data = request.get_json()
        pergunta = data.get("pergunta", "")

        if not pergunta:
            return jsonify({"error": "Forneça uma pergunta"}), 400

        try:
            print(f"📥 Pergunta recebida: {pergunta}")

            resultado = qa_chain({"query": pergunta})

            response = {
                "resposta": resultado["result"],
                "fontes": [
                    {
                        "fonte": doc.metadata.get("fonte", "N/A"),
                        "categoria": doc.metadata.get("categoria", "N/A"),
                        "pagina": doc.metadata.get("chunk_numero", "N/A"),
                    }
                    for doc in resultado["source_documents"]
                ],
            }

            print(f"📤 Resposta enviada: {len(response['resposta'])} caracteres")

            return jsonify(response)

        except Exception as e:
            print(f"❌ Erro: {e}")
            return jsonify({"error": "Erro interno no processamento"}), 500

    return app