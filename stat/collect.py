from .utils import *
from .query import *

def rlims():
    raw = get_collection('rlims', 'raw')
    print get_count(raw, _MAPPER_ENTITY_TYPE, _REDUCER_COUNT, 'test')