def dump_network(NODES, EDGES):
    return {
        "nodes": [{"data": n.__dict__} for n in NODES.values()],
        "edges": [{"data": e.__dict__} for e in EDGES.values()],
    }


