from map_reduce_func import *
from pymongo import MongoClient

client = MongoClient()


def get_coll(db, coll):
    return client[db][coll]

def get_sample_data(collection):
    return collection.find_one()

def get_count(collection, m, r):
    """                                                                                                                              collection: collection object                                                                                                    m: map function                                                                                                                  r: reduce function                                                                                                               """
    return collection.inline_map_reduce(m, r, full_response=True)                                                             

def db_insert_one(collection, data):
    collection.insert_one(data)



class Stat(object):
    def __init__(self, tool, collection_name):
        self.tool = tool
        self.collection_name = collection_name
        self.coll_data = get_coll(tool, collection_name)
        self.coll_stat = get_coll(tool, 'stat')
        self.name_stat_prefix = tool + '_' + collection_name + '_'

    def basic_counts(self):
        self.entity_type()
        self.relation_role()

    def entity_type(self):
        self.counter(MAPPER_ENTITY_TYPE, 'entity_type')

    def relation_role(self):
        self.counter(MAPPER_RELATION_ROLE, 'relation_role')

    def counter(self, mapper_func, stat_type):
        """Reducer function is count. Generate result and insert into stat table."""
        name = self.name_stat_prefix + stat_type
        data = get_count(self.coll_data, mapper_func, REDUCER_COUNT)
        db_insert_one(self.coll_stat, {'name': name, 'data': data})
