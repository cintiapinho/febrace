from flask import Flask, request, jsonify
from flask_cors import CORS
from app.api.services.services import gerarRespostasLLM
from langchain_groq import ChatGroq
import json, re, os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}}, allow_headers=["Content-Type", "Authorization"], methods=["GET","POST","PUT","DELETE","OPTIONS"])

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "API DrAignostico rodando",
        "rotas": [
            "/respostas-llm (POST)",
            "/doenca/<nome> (GET)"
        ]
    })


@app.route("/respostas-llm", methods=["POST", "OPTIONS"])
def respostas_llm():

    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200

    try:
        data = request.get_json()

        if not data:
            return jsonify({"erro": "JSON não enviado"}), 400

        question = data.get("question", "").strip()
        context = data.get("context", "").strip()

        if not question:
            return jsonify({"erro": "A pergunta não pode ser vazia"}), 400

        resultado = gerarRespostasLLM(
            question=question,
            context=context
        )

        if isinstance(resultado, tuple):
            return jsonify(resultado[0]), resultado[1]

        return jsonify(resultado), 200

    except Exception as e:
        return jsonify({"erro": str(e)}), 500


@app.route("/doenca/<nome>", methods=["GET"])
def get_doenca(nome):

    try:

        api_key = os.getenv("GROQ_API_KEY")

        llm = ChatGroq(
            model="llama-3.1-8b-instant",
            temperature=0.2,
            api_key=api_key
        )

        prompt = f"""
Você é um sistema de apoio médico.

Responda APENAS em JSON válido.

Sobre a doença "{nome}", retorne neste formato:

{{
  "descricao": "texto breve explicando a doença",
  "sintomas": ["sintoma1", "sintoma2"],
  "tratamentos": ["tratamento1"],
  "aviso": "aviso ao paciente"
}}
"""

        resposta = llm.invoke(prompt)

        conteudo = getattr(resposta, "content", str(resposta)).strip()

        match = re.search(r"\{.*\}", conteudo, re.DOTALL)

        if match:
            conteudo = match.group(0)

        try:
            dados = json.loads(conteudo)
        except Exception:
            dados = {
                "descricao": conteudo,
                "sintomas": [],
                "tratamentos": [],
                "aviso": ""
            }

        return jsonify({
            "descricao": dados.get("descricao",""),
            "sintomas": dados.get("sintomas",[]),
            "tratamentos": dados.get("tratamentos",[]),
            "aviso": dados.get("aviso","")
        }), 200

    except Exception as e:
        return jsonify({"erro": str(e)}), 500


if __name__ == "__main__":
    print("Servidor DrAignostico iniciado")
    print("API rodando em: http://localhost:8000")

    app.run(
        host="0.0.0.0",
        port=8000,
        debug=True
    )
