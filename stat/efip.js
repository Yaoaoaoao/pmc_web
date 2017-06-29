load('collect.js');

/** @const @private */
const MAPPER_RELATION_ARGS = function() {
    let hasRelation = false;
    for (let relation of Object.values(this.relation)) {
        // Filters 
        if (relation['relationType'] != 'IMPACT') break;

        if (!('argument' in relation)) break;

        let direction;
        if (!('attribute' in relation)) break;
        for (let attr of relation['attribute']) {
            if (attr['key'] == 'direction') {
                direction = attr['value'];
                break;
            }
        }

        // Substrate, site, kinase, interactant, direction
        let roles = new Array(5).fill(null);
        roles[4] = direction;
        for (let arg of relation['argument']) {
            let role = arg['role'];
            let duid = arg['entity_duid'];
            let name = role + normalized ? isNormalized(this.entity, duid) : '';

            if (role == 'SUBSTRATE')
                roles[0] = name;
            else if (role == 'SITE')
                roles[1] = name;
            else if (role == 'KINASE')
                roles[2] = name;
            else if (role == 'INTERACTANT')
                roles[3] = name;
            /*
             else if (role == 'PTMTRIGGER')
             roles[4] = name;
             else if (role == 'PPITRIGGER')
             roles[5] = name;
             else if (role == 'IMPACTTRIGGER')
             roles[6] = name;
             */
        }

        // Check if roles are all null.
        if (!hasRelation && !roles.every((i) => {
                return i == null;
            }))
            hasRelation = true;
        emit(roles.join(', '), 1);
    }

    if (hasRelation) emit(doc_count, 1);
};


let efip = new Stat('efip', 'raw');
efip.entityType();
efip.relationRole();
efip.relationArgs(MAPPER_RELATION_ARGS);

let efip_norm = new Stat('efip', 'normalized', true);
efip_norm.entityType(true);
efip_norm.relationRole(true);
efip_norm.relationArgs(MAPPER_RELATION_ARGS);
