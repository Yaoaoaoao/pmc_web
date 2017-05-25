class Edge(object):
    def __init__(self):
        self.Interaction = ''
        self.source = ''
        self.target = ''
        self.json = ''

    @staticmethod
    def add(k, EDGES):
        """
        methods independent to this class.
        :return: new edge or not
        """
        sn, tn, i = k
        if not EDGES.has_key(k):
            EDGES[k] = Edge()
            EDGES[k].source = sn
            EDGES[k].target = tn
            EDGES[k].Interaction = i
            return True
        else:
            return False
