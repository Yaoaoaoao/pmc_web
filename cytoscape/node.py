class Node(object):
    def __init__(self, id):
        self.id = id
        self.Label = ''
        self.json = ''

    @staticmethod
    def add(id, NODES):
        """
        methods independent to this class.
        :return: new node or not
        """
        if not NODES.has_key(id):
            NODES[id] = Node(id)
            return True
        else:
            return False
