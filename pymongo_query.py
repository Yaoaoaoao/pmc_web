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


def run_query(db, collection, query):
    return client[db][collection].find(query, {'_id': 0})
