from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from datetime import datetime
from app.database import Base


class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100))
    crm = Column(String(20))
    email = Column(String(150), unique=True)
    senha = Column(String(255))
    criado_em = Column(DateTime, default=datetime.utcnow)


class HistoricoDiagnostico(Base):
    __tablename__ = "historico_diagnostico"

    id = Column(Integer, primary_key=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    sintomas = Column(Text)
    resposta_ia = Column(Text)
    criado_em = Column(DateTime, default=datetime.utcnow)