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
    fields = {'_id': 0, 'name': 1, 'data.counts': 1, 'data.results': 1}
    if name is None:
        cursor = client[db][collection]['stat'].find({}, fields)
        if cursor:
            return list(cursor)
    else: 
        return client[db][collection]['stat'].find_one({'name': name}, fields)
