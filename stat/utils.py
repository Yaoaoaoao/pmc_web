from pymongo import MongoClient

client = MongoClient()


def get_collection(db_name, collection_name):
    """ Return collection object. """
    return client[db_name][collection_name]


def get_count(collection, m, r, name="result"):
    """
    collection: collection object
    m: map function
    r: reduce function
    name: out collection name
    """
    return collection.map_reduce(m, r, name)


def db_insert(collection, record):
    collection.insert_one(record)
