const MAPPER_ENTITY_TYPE = function() {
    Object.keys(this.entity).forEach((duid) => {
        var entityType = this.entity[duid].entityType;
        if (normalized) {
            var n = isNormalized(this.entity, duid);
            emit(entityType + n, 1);
        }
        emit(entityType, 1);
    });
};

const MAPPER_RELATION_ROLE = function() {
    Object.values(this.relation).forEach((relation) => {
        if (!('argument' in relation)) return;

        for (var arg of relation['argument']) {
            var role = arg['role'];
            if (normalized) {
                var n = isNormalized(this.entity, arg['entity_duid']);
                emit(role + n, 1);
            }
            emit(role, 1);
        }
    });
};

const REDUCER_COUNT = function(key, cnt) {
    return Array.sum(cnt);
};
