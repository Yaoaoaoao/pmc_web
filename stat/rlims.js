load('collect.js');

/** @const @private */
const MAPPER_RELATION_ARGS = function() {
    let hasRelation = false;
    for (let relation of Object.values(this.relation)) {
        if (!('argument' in relation)) break;

        // Substrate, site, kinase
        let roles = new Array(3).fill(null);
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

let rlims = new Stat('rlims', 'raw');
rlims.entityType();
rlims.relationRole();
rlims.relationArgs(MAPPER_RELATION_ARGS);

let rlims_norm = new Stat('rlims', 'normalized', true);
rlims_norm.entityType(true);
rlims_norm.relationRole(true);
rlims_norm.relationArgs(MAPPER_RELATION_ARGS);

