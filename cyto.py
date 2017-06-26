from cytoscape import *
import json
import tm


def convert(data):
    """data is a json object for a pmid"""
    NODES, EDGES = {}, {}

    for duid, entity in data['entity'].iteritems():
        if entity['entityType'] == 'Trigger':
            continue
        if Node.add(duid, NODES):
            NODES[duid].Label = entity['entityText']
            NODES[duid].source = entity['source']
            NODES[duid].json = json.dumps(entity)

    for duid, relation in data['relation'].iteritems():
        duid = relation['duid']
        sn, tn = None, None
        if relation['source'] == 'miRTex':
            sn, tn = tm.mirtex.cytoscape_relation_args(relation)
        # elif relation['source'] == 'RLIMS-P':
        #     sn, tn = tm.rlims.cytoscape_relation_args(relation)
        if sn not in NODES or tn not in NODES:
            continue
        if Edge.add(duid, sn, tn, relation['relationType'], EDGES):
            EDGES[duid].json = json.dumps(relation)

    return dump_network(NODES, EDGES)
