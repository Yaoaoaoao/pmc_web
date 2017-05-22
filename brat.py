import json

def generate_entity(e):
    return [e['duid'], e['entityType'], [[e['charStart'], e['charEnd']+1]]]

def convert(json):
    """ Return brat js object. """
    docData = {'text': json['text'],
               'entities': [],
               'triggers': [],
               'relations': [],
               'events':[]
}
    for e in json['entity'].values():
        # Format: [${ID}, ${TYPE}, [[${START}, ${END}]]]
        if e['entityType'] != 'Trigger':
            docData['entities'].append(generate_entity(e))

    for r in json['relation'].values():
        trigger, arg1, arg2 = None, None, None
        for a in r['argument']:
            if a['role'] == 'Trigger':
                trigger = a['entity_duid']
            elif a['role'] == 'Agent':
                arg1 = [a['role'], a['entity_duid']]
            elif a['role'] == 'Theme':
                arg2 = [a['role'], a['entity_duid']]
        
        args = []
        args.append(arg1 if arg1 is not None else [])
        args.append(arg2 if arg2 is not None else [])

        if trigger is not None:
            entity = generate_entity(json['entity'][trigger])
            entity[1] = r['relationType']
            docData['triggers'].append(entity)

            # Format: [${ID}, ${TRIGGER}, [[${ARGTYPE}, ${ARGID}], ...]]
            event = [r['duid'], trigger, args]
            docData['events'].append(event)
        else:
            # Format: [${ID}, ${TYPE}, [[${ARGNAME}, ${TARGET}], [${ARGNAME}, ${TARGET}]]]         
            relation = [r['duid'], r['relationType'], args]
            docData['relations'].append(relation)
        
    return docData
