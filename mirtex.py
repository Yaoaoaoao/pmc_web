def relation(r):
    trigger_id, arg1, arg2 = None, None, None
    for a in r['argument']:
        if a['role'] == 'Trigger':
            trigger_id = a['entity_duid']
        elif a['role'] == 'Agent':
            arg1 = [a['role'], a['entity_duid']]
        elif a['role'] == 'Theme':
            arg2 = [a['role'], a['entity_duid']]

    args = []
    args.append(arg1 if arg1 is not None else [])
    args.append(arg2 if arg2 is not None else [])
    
    return trigger_id, args
