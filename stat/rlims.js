load('collect.js');

/** @const @private */
const MAPPER_RELATION_ARGS = function() {
    var hasRelation = false;
    Object.keys(this.relation).forEach((i) => {
        if (!('argument' in this.relation[i]))
            return;
        // Substrate, site, kinase
        var roles = Array(3).fill(null);
	this.relation[i]['argument'].forEach((arg) => {
            var role = arg['role'];
	    var suffix = normalized ? isNormalized(this.entity, arg['entity_duid']) : '';
            if (role == 'SUBSTRATE')
		roles[0] = 'SUBSTRATE' + suffix;
            else if (role == 'SITE')
                roles[1] = 'SITE' + suffix;
            else if (role == 'KINASE')
                roles[2] = 'KINASE' + suffix;
        });
	// Check if roles are all null.
	if (!hasRelation && !roles.every((i) => { return i == null; }))
	    hasRelation = true;
        emit({'name': roles}, 1);
    });
    if (hasRelation) 
	emit({'name': 'doc_count'}, 1);
};

/*
var rlims = new Stat('rlims', 'raw');
rlims.entityType();
rlims.relationRole();
rlims.counter(MAPPER_RELATION_ARGS, 'relation_args');
*/
var rlims_norm = new Stat('rlims', 'normalized', true);
rlims_norm.entityType(true);
rlims_norm.relationRole(true);
rlims_norm.counter(MAPPER_RELATION_ARGS, 'relation_args');

