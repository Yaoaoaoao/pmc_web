from pymongo import MongoClient
import re

client = MongoClient()


def get_section_list(db, collection, pmcid):
    pmcid_query = re.compile('^' + pmcid, re.IGNORECASE)
    cursor = client[db][collection].find({'docId': pmcid_query},
                                         {'docId': 1, '_id': 0})
    return list(cursor)


def get_data(db, collection, key, value):
    return client[db][collection].find_one({key: value}, {'_id': 0})

def get_stat(db, collection, name):
    if name is None:
        collections = [c for c in client[db].collection_names() if c.startswith(collection+'.stat.')]
        rst = {}
        for c in collections:
            rst[c] = list(client[db][c].find())
        return rst
    else:
        cursor = client[db][collection]['stat'][name].find({})
        if cursor:
            return list(cursor)
