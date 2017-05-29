class Edge(object):
    def __init__(self):
        self.id = ''
        self.Interaction = ''
        self.source = ''
        self.target = ''
        self.json = ''

    @staticmethod
    def add(id, sn, tn, i, EDGES):
        """
        methods independent to this class.
        :return: new edge or not
        """
        if not EDGES.has_key(id):
            EDGES[id] = Edge()
            EDGES[id].id = id
            EDGES[id].source = sn
            EDGES[id].target = tn
            EDGES[id].Interaction = i
            return True
        else:
            return False
