from tm import mirtex


def generate_entity(e):
    # Format: [${ID}, ${TYPE}, [[${START}, ${END}]]]
    return [e['duid'], e['entityType'], [[e['charStart'], e['charEnd'] + 1]]]


def convert(json):
    """ Return brat js object. """
    docData = {
        'docId': json['docId'],
        'text': json['text'],
        'entities': [], 
        'triggers': [], 
        'relations': [], 
        'events': []}

    for e in json['entity'].values():
        if e['entityType'] == 'Trigger':
            continue
        docData['entities'].append(generate_entity(e))

    for r in json['relation'].values():
        trigger_id, args = None, None
        if r['source'] == 'miRTex':
            trigger_id, args = mirtex.brat_relation(r)
            print trigger_id

        if trigger_id is not None:
            entity = generate_entity(json['entity'][trigger_id])
            # Change trigger name to relationType.
            entity[1] = r['relationType']
            docData['triggers'].append(entity)

            # Format: [${ID}, ${TRIGGER}, [[${ARGTYPE}, ${ARGID}], ...]]
            event = [r['duid'], trigger_id, args]
            docData['events'].append(event)
        else:
            # Format: [${ID}, ${TYPE}, [[${ARGNAME}, ${TARGET}], ...]]
            relation = [r['duid'], r['relationType'], args]
            docData['relations'].append(relation)

    return docData
