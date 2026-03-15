from flask_restx import fields
from flask_restx.reqparse import RequestParser

# ==============================
# PARSERS
# ==============================

idParser = RequestParser(bundle_errors=True)
idParser.add_argument(
    name='id',
    type=str,
    required=True,
    location='json'
)

perguntaParser = RequestParser(bundle_errors=True)
perguntaParser.add_argument(
    name='pergunta',
    type=str,
    required=True,
    location='json'
)


# ==============================
# MODELOS DE RETORNO
# ==============================

def get_models(api):

    retornoModel = api.model('Retorno', {
        'id': fields.String,
        'data': fields.String,
        'pergunta': fields.String,
        'resposta': fields.String
    })

    retornoModelList = api.model('RetornoList', {
        'dados': fields.List(fields.Nested(retornoModel))
    })

    return retornoModel, retornoModelList