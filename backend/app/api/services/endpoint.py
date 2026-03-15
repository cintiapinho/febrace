from flask_restx import Resource, Namespace
from flask import request
from app.api.services.services import (
    obterDados,
    gerarRespostasLLM,
    listarTodos,
    atualizarResposta,
    deletarRegistro
)
from app.api.services.dto import idParser, get_models

NAMESPACE = {
    "name": "services",
    "validate": True,
    "description": "Endpoints de serviços do sistema."
}

services_ns = Namespace(**NAMESPACE)
retornoModel, retornoModelList = get_models(services_ns)

@services_ns.route('/respostas-llm')
class PerguntaLLM(Resource):
    def post(self):
        data = request.get_json()
        if not data:
            return {"erro": "JSON não enviado"}, 400
        pergunta = data.get("pergunta")
        if not pergunta:
            return {"erro": "Campo 'pergunta' não enviado"}, 400
        resultado = gerarRespostasLLM(pergunta)
        return resultado

@services_ns.route('/obtendo-dados-por-id')
class GetDados(Resource):
    @services_ns.expect(idParser)
    @services_ns.marshal_with(retornoModel)
    def get(self):
        args = idParser.parse_args()
        return obterDados(args['id'])

@services_ns.route('/obtendo-dados-todos')
class GetTodosDados(Resource):
    @services_ns.marshal_with(retornoModelList)
    def get(self):
        return listarTodos()

@services_ns.route('/atualizar-resposta')
class AtualizarResposta(Resource):
    @services_ns.expect(idParser)
    def put(self):
        args = idParser.parse_args()
        return atualizarResposta(args['id'])

@services_ns.route('/deletar-registro')
class DeletarRegistro(Resource):
    @services_ns.expect(idParser)
    def delete(self):
        args = idParser.parse_args()
        return deletarRegistro(args['id'])