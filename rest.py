from flask_restful import Resource
from pmc import *
from brat import convert


class PMCTextJson(Resource):
    def get(self, pmcid):
        return get_text('text', pmcid)


class PMCRawJson(Resource):
    def get(self, pmcid):
        return get_result('raw', pmcid)


class PMCCleanedJson(Resource):
    def get(self, pmcid):
        return {'pmcid': pmcid, 'type': 'CLEANED'}


class PMCRawBrat(Resource):
    def get(self, pmcid):
        data = get_result('raw', pmcid)
        return [convert(sec) for sec in data]
