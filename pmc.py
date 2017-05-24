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


def get_result(db, pmcid):
    if not db in DB:
        return []

    pmcid_query = re.compile('^' + pmcid, re.IGNORECASE)
    cursor = DB[db].find({'docId': pmcid_query}, {'_id': 0})
    return list(cursor)

