import pymongo
from pymongo import MongoClient
import re

client = MongoClient()

DB = {
    'text': client['pmc']['text'],
    'raw': client['pmc']['raw'],
    'cleaned': None
}


def get_text(db, pmcid):
    if not db in DB:
        return []

    cursor = DB[db].find({"pmcid": pmcid}, {"_id": 0}).sort("id", 1)
    return list(cursor)


def get_section_list(db, pmcid):
    if not db in DB:
        return None

    pmcid_query = re.compile('^' + pmcid, re.IGNORECASE)
    cursor = DB[db].find({'docId': pmcid_query}, {'docId': 1, '_id': 0})
    return list(cursor)

def get_result(db, pmcid_id):
    if not db in DB:
        return None

    cursor = DB[db].find_one({'docId': pmcid_id}, {'_id': 0})
    return cursor

def get_data(db, collection, key, query):
    print db, collection, key, query
    return client[db][collection].find_one({key: query}, {'_id': 0})
