from bson.code import Code

_MAPPER_ENTITY_TYPE = Code("""
    function() {
        for (var i in this.entity)
            emit(this.entity[i].entityType, 1);
    }
""")

_MAPPER_RELATION_ROLE = Code("""
    function() {
        for (var i in this.relation) {
            if ('argument' in this.relation[i]) {
                var args = this.relation[i]['argument'];
                for (var a in args) {
                    var role = args[a]['role'];
                    emit(role, 1);
                }
            }
        }
    }
""")

_REDUCER_COUNT = Code("""
    function(key, cnt) {
        return Array.sum(cnt);
    };
""")
