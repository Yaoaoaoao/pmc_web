from pymongo import MongoClient
import re

client = MongoClient()


def get_section_list(db, collection, pmcid):
    pmcid_query = re.compile('^' + pmcid, re.IGNORECASE)
    cursor = client[db][collection].find({'docId': pmcid_query},
                                         {'docId': 1, '_id': 0})
    return list(cursor)


def get_data(db, collection, key, value):
    cursor = client[db][collection].find_one({key: value}, {'_id': 0})
    return list(cursor)
