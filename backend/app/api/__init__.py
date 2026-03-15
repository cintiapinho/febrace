from flask_restx import Api
from flask import Blueprint
from app.api.services.endpoint import services_ns

# ==============================
# BLUEPRINT DA API
# ==============================

api_bp = Blueprint("api", __name__, url_prefix="/api")


# ==============================
# CONFIGURAÇÃO DA API
# ==============================

api = Api(
    api_bp,
    title="DrAignostico API",
    version="1.0",
    description="API de diagnóstico médico com IA e RAG",
    doc="/docs"  # Swagger UI
)


# ==============================
# NAMESPACES
# ==============================

api.add_namespace(services_ns, path="/services")