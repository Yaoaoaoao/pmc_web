from flask_restful import Resource
from pmc import *
import brat
import cyto


class PMCTextJson(Resource):
    def get(self, pmcid):
        return get_text('text', pmcid)


class PMCRawJson(Resource):
    def get(self, pmcid_id):
        return get_result('raw', pmcid_id)


class PMCCleanedJson(Resource):
    def get(self, pmcid):
        return {'pmcid': pmcid, 'type': 'CLEANED'}


class PMCRawBrat(Resource):
    def get(self, pmcid):
        data = get_result('raw', pmcid)
        return [brat.convert(sec) for sec in data]

class PMCRawCyto(Resource):
    def get(self, pmcid_id):
        data = get_result('raw', pmcid_id)
        return cyto.convert(data)
