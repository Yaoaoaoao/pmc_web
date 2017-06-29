const MAPPER_ENTITY_TYPE = function() {
    for (let duid of Object.keys(this.entity)) {
        let entityType = this.entity[duid].entityType;
        if (normalized) {
            let n = isNormalized(this.entity, duid);
            emit(entityType + n, 1);
        }
        emit(entityType, 1);
    }
};

const MAPPER_RELATION_ROLE = function() {
    for (let relation of Object.values(this.relation)) {
        if (!('argument' in relation)) break;

        for (let arg of relation['argument']) {
            let role = arg['role'];
            if (normalized) {
                let n = isNormalized(this.entity, arg['entity_duid']);
                emit(role + n, 1);
            }
            emit(role, 1);
        }
    }
};

const REDUCER_COUNT = function(key, cnt) {
    return Array.sum(cnt);
};
