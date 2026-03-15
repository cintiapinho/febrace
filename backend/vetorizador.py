import os
from pathlib import Path

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader

# ==============================
# CONFIGURAÇÃO
# ==============================

BASE_DIR = Path(__file__).resolve().parent
DADOS_DIR = BASE_DIR / "dados"
VETORES_DIR = BASE_DIR / "vetores_doencas"

print("🔎 Procurando PDFs na pasta 'dados'...")


# ==============================
# FUNÇÃO PRINCIPAL
# ==============================
def carregar_e_vetorizar_pdfs():
    documentos = []

    if not DADOS_DIR.exists():
        print("❌ ERRO: Pasta 'dados' não encontrada!")
        return None

    pdfs = list(DADOS_DIR.rglob("*.pdf"))

    print(f"📄 Total de PDFs encontrados: {len(pdfs)}")

    if len(pdfs) == 0:
        print("❌ Nenhum PDF encontrado!")
        return None

    # ==============================
    # DIVISOR DE TEXTO
    # ==============================
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=150
    )

    print("\n📖 Lendo PDFs...")

    for pdf in pdfs:
        try:
            print(f"   📄 Processando: {pdf.name}")

            loader = PyPDFLoader(str(pdf))
            paginas = loader.load()

            chunks = text_splitter.split_documents(paginas)

            for chunk in chunks:
                chunk.metadata["arquivo"] = pdf.name
                chunk.metadata["categoria"] = pdf.parent.name

                documentos.append(chunk)

        except Exception as e:
            print(f"❌ Erro em {pdf.name}: {e}")

    print(f"\n🧩 Total de chunks criados: {len(documentos)}")

    if len(documentos) == 0:
        print("❌ Nenhum documento foi processado!")
        return None

    print("\n🧠 Vetorizando textos...")

    try:

        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        vectorstore = FAISS.from_documents(documentos, embeddings)

        # salvar no caminho correto
        vectorstore.save_local(str(VETORES_DIR))

        print(f"✅ Vetores salvos em: {VETORES_DIR}")

        return vectorstore

    except Exception as e:
        print(f"❌ Erro na vetorização: {e}")
        return None


# ==============================
# EXECUÇÃO DIRETA
# ==============================
if __name__ == "__main__":

    print("🚀 INICIANDO VETORIZAÇÃO DOS PDFs")
    print("=" * 50)

    vetorizador = carregar_e_vetorizar_pdfs()

    if vetorizador:
        print("\n✅ VETORIZAÇÃO CONCLUÍDA COM SUCESSO!")
        print(f"Chunks criados: {vetorizador.index.ntotal}")
    else:
        print("\n❌ Falha na vetorização.")