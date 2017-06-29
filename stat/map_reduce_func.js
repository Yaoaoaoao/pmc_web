/** @const */
var MAPPER_ENTITY_TYPE = function () {
    Object.keys(this.entity).forEach((duid) => {
        emit(this.entity[duid].entityType, 1);
    });
};

/** @const */
var MAPPER_ENTITY_TYPE_NORMALIZED = function () {
    Object.keys(this.entity).forEach((duid) => {
        var entityType = this.entity[duid].entityType;
        var n = isNormalized(this.entity, duid);
        emit([entityType, n], 1);
        emit(entityType, 1);
    });
};

/** @const */
var MAPPER_RELATION_ROLE = function () {
    Object.keys(this.relation).forEach((i) => {
        if ('argument' in this.relation[i]) {
            Object.values(this.relation[i]['argument']).forEach((arg) => {
                var role = arg['role'];
                emit(role, 1);
            });
        }
    })
};

/** @const */
var MAPPER_RELATION_ROLE_NORMALIZED = function () {
    Object.keys(this.relation).forEach((i) => {
        if ('argument' in this.relation[i]) {
            Object.values(this.relation[i]['argument']).forEach((arg) => {
                var role = arg['role'];
                var duid = arg['entity_duid'];
                var n = isNormalized(this.entity, duid);
                emit([role, n], 1);
                emit(role, 1);
            });
        }
    })
};

/** @const */
var REDUCER_COUNT = function (key, cnt) {
    return Array.sum(cnt);
};
