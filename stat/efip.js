load('collect.js');

/** @const @private */
const MAPPER_RELATION_ARGS = function() {
    var hasRelation = false;
    Object.keys(this.relation).forEach((i) => {
	if (this.relation[i]['relationType'] != 'IMPACT')
	    return;

        if (!('argument' in this.relation[i]))
            return;

	var direction;
	if (!('attribute' in this.relation[i]))
	    return;
	this.relation[i]['attribute'].forEach((attr) => {
	    if (attr['key'] == 'direction') {
		direction = attr['value'];
		return;
	    }
	});

        // Substrate, site, kinase, interactant, ptm_trigger, ppi_trigger, impact_trigger, direction
        //var roles = Array(7).fill(null)
        // Substrate, site, kinase, interactant, direction
	var roles = Array(5).fill(null);
	roles[4] = direction;
	this.relation[i]['argument'].forEach((arg) => {
            var role = arg['role'];
	    var suffix = normalized ? isNormalized(this.entity, arg['entity_duid']) : '';
            if (role == 'SUBSTRATE')
		roles[0] = 'SUBSTRATE' + suffix;
            else if (role == 'SITE')
                roles[1] = 'SITE' + suffix;
            else if (role == 'KINASE')
                roles[2] = 'KINASE' + suffix;
            else if (role == 'INTERACTANT')
                roles[3] = 'INTERACTANT' + suffix;
           /*
	    else if (role == 'PTMTRIGGER')
                roles[4] = 'PTMTRIGGER' + suffix;
            else if (role == 'PPITRIGGER')
                roles[5] = 'PPITRIGGER' + suffix;
            else if (role == 'IMPACTTRIGGER')
                roles[6] = 'IMPACTTRIGGER' + suffix;
	   */
        });
	// Check if roles are all null.
	if (!hasRelation && !roles.every((i) => { return i == null; }))
	    hasRelation = true;
        emit({'name': roles}, 1);
    });
    if (hasRelation) 
	emit({'name': 'doc_count'}, 1);
};


var efip = new Stat('efip', 'raw');
efip.entityType();
efip.relationRole();
efip.counter(MAPPER_RELATION_ARGS, 'relation_args');

var efip_norm = new Stat('efip', 'normalized', true);
efip_norm.entityType(true);
efip_norm.relationRole(true);
efip_norm.counter(MAPPER_RELATION_ARGS, 'relation_args');
