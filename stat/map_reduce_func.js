/** @const */
var MAPPER_ENTITY_TYPE = function () {
    for (var i in this.entity)
        emit(this.entity[i].entityType, 1);
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
