ROLE1 = 'Agent'
ROLE2 = 'Theme'


def brat_relation(r):
    trigger_id, arg1, arg2 = None, None, None
    for a in r['argument']:
        if a['role'] == 'Trigger':
            trigger_id = a['entity_duid']
        elif a['role'] == ROLE1:
            arg1 = [a['role'], a['entity_duid']]
        elif a['role'] == ROLE2:
            arg2 = [a['role'], a['entity_duid']]

    args = []
    args.append(arg1 if arg1 is not None else [])
    args.append(arg2 if arg2 is not None else [])

    return trigger_id, args


def cytoscape_relation(r):
    arg1, arg2 = None, None
    for a in r['argument']:
        if a['role'] == ROLE1:
            arg1 = a['entity_duid']
        elif a['role'] == ROLE2:
            arg2 = a['entity_duid']

        return (arg1, arg2, r['relationType'])
