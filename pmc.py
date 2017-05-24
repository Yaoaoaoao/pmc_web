# import pymongo
# from pymongo import MongoClient
# import re
# 
# client = MongoClient()
# 
# DB = {
#     'text': client['pmc']['text'],
#     'raw': client['pmc']['raw'],
#     'cleaned': None
# }
# 
# 
# def get_text(db, pmid):
#     if not db in DB:
#         return []
# 
#     cursor = DB[db].find({"pmid": pmid}, {"_id": 0}).sort("id", 1)
#     return list(cursor)
# 
# 
# def get_result(db, pmcid):
#     if not db in DB:
#         return []
# 
#     pmcid_query = re.compile('^' + pmcid, re.IGNORECASE)
#     cursor = DB[db].find({'docId': pmcid_query}, {'_id': 0})
#     return list(cursor)

def get_result(db, pmcid):
    import test
    test.TEST_JSON[0]['text'] = test.TEST_JSON[0]['text'].encode('utf-8')
    return test.TEST_JSON