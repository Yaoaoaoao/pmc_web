from flask_restful import Resource
from pymongo_query import *
import brat
import cyto


def get_sections(db, collection, pmcid):
    return [i.get('docId') for i in get_section_list(db, collection, pmcid)]


class MongoJson(Resource):
    def get(self, db, collection, key, value, format='json'):
        data = get_data(db, collection, key, value)
        if format == 'json':
            return data
        elif format == 'brat':
            return brat.convert(data)
        elif format == 'cyto':
            return cyto.convert(data)
        else:
            return data

class StatJson(Resource):
    def get(self, db, collection, name=None):
        return get_stat(db, collection, name)
