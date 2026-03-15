import os
from pathlib import Path
from dotenv import load_dotenv
import traceback

from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_groq import ChatGroq

from langchain.prompts import PromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent
DADOS_DIR = BASE_DIR / "dados"
FAISS_DIR = BASE_DIR / "vetores_doencas"

if not DADOS_DIR.exists():
    raise FileNotFoundError(f"Pasta 'dados' não encontrada em {DADOS_DIR}")


def criar_chain_rag():
    try:

        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        if not FAISS_DIR.exists():
            raise RuntimeError(
                "❌ Índice FAISS não encontrado. Execute primeiro: python vetorizador.py"
            )

        vectorstore = FAISS.load_local(
            str(FAISS_DIR),
            embeddings,
            allow_dangerous_deserialization=True
        )

        retriever = vectorstore.as_retriever(
            search_type="similarity",
            search_kwargs={"k": 5}
        )

        llm = ChatGroq(
            model="llama-3.1-8b-instant",
            temperature=0,
            api_key=os.getenv("GROQ_API_KEY")
        )

        # PROMPT PARA MÉDICOS
        prompt_template = """
Você é um sistema de apoio ao diagnóstico clínico utilizado por médicos.

Com base nos sintomas fornecidos e nos documentos médicos recuperados,
liste até 5 possíveis diagnósticos diferenciais mais prováveis.

Responda apenas com os nomes das doenças, um por linha.

Informações do paciente e sintomas:
{input}

Documentos médicos relevantes:
{context}
"""

        prompt = PromptTemplate(
            input_variables=["context", "input"],
            template=prompt_template
        )

        document_chain = create_stuff_documents_chain(
            llm,
            prompt
        )

        chain = create_retrieval_chain(
            retriever,
            document_chain
        )

        return chain

    except Exception as e:
        print("❌ Erro ao criar chain RAG:")
        traceback.print_exc()
        return None
