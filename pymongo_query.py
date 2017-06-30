from pymongo import MongoClient
import re

client = MongoClient()


def get_section_list(db, collection, pmcid):
    pmcid_query = re.compile('^' + pmcid, re.IGNORECASE)
    cursor = client[db][collection].find({'docId': pmcid_query},
                                         {'docId': 1, '_id': 0})
    return list(cursor)


def run_query(db, collection, query):
    return client[db][collection].find(query, {'_id': 0})


def get_stat(db, collection, name):
    if name is None:
        # Return all statistics in a dictionary.
        # key is stat name, value is a list of {'_id': name, 'value': count}.
        collections = [c for c in client[db].collection_names() if
                       c.startswith(collection + '.stat.')]
        return {c: list(client[db][c].find()) for c in collections}
    else:
        cursor = client[db][collection]['stat'][name].find({})
        if cursor:
            return list(cursor)
