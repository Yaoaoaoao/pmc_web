/** @const */
var MAPPER_ENTITY_TYPE = function (normalized_) {
    // If normalized_ == true, emit extra message to count normalized entity.
    for (var duid in this.entity) {
        var entityType = this.entity[duid].entityType;
        if (normalized_) {
            var n = isNormalized(this.entity, duid) ? 'normalized' : null ;
            emit([entityType, n], 1);
        }
        emit(entityType, 1);
    }
};

/** @const */
var MAPPER_RELATION_ROLE = function () {
    for (var i in this.relation) {
        if ('argument' in this.relation[i]) {
            var args = this.relation[i]['argument'];
            for (var a in args) {
                var role = args[a]['role'];
                emit(role, 1);
            }
        }
    }
};

/** @const */
var REDUCER_COUNT = function (key, cnt) {
    return Array.sum(cnt);
};
