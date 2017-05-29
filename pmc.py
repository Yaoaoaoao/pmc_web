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


def get_result(db, pmcid_id):
    if not db in DB:
        return None

    #pmcid_query = re.compile('^' + pmcid, re.IGNORECASE)
    #cursor = DB[db].find({'docId': pmcid_query}, {'_id': 0})
    cursor = DB[db].find_one({'docId': pmcid_id}, {'_id': 0})
    return cursor

