from cytoscape import *
import json
import mirtex


def convert(data):
    """data is a json object for a pmid"""
    NODES, EDGES = {}, {}

    for duid, entity in data['entity'].iteritems():
        if Node.add(duid, NODES):
            NODES[duid].Label = entity['entityText']
            NODES[duid].source = entity['source']
            NODES[duid].json = json.dumps(entity)

    for duid, relation in data['relation'].iteritems():
        k = mirtex.cytoscape_relation(relation)
        if k[0] not in NODES or k[1] not in NODES:
            continue
        if Edge.add(k, EDGES):
            EDGES[k].json = json.dumps(relation)

    return dump_network(NODES, EDGES)
