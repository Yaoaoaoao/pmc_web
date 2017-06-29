load('map_reduce_func.js');

/**
 * A constructo function that initializes new Stat objects.
 * If insert is called, map reduce result will be saved under db.collection.stat
 * with given name.
 * @constructor
 */
function Stat(tool, collection) {
    this.tool = tool;
    this.collection = collection;
    this.collData = new Mongo().getDB(tool).getCollection(collection);
    this.collStat = this.collData.getCollection('stat');
}

Stat.prototype = {
    entityType: function (normalized_) {
        if (!normalized)
            this.counter(MAPPER_ENTITY_TYPE, 'entity_type');
        else
            this.counter(MAPPER_ENTITY_TYPE_NORMALIZED, 'entity_type_normalized');
    },
    relationRole: function (normalized_) {
        if (!normalized)
            this.counter(MAPPER_RELATION_ROLE, 'relation_role');
        else
            this.counter(MAPPER_RELATION_ROLE_NORMALIZED, 'relation_role_normalized');
    },
    mapReduce: function (mapper, reducer) {
        return this.collData.mapReduce(
            mapper, reducer,
            {out: {inline: 1}}
        );
    },
    insert: function (statType, data) {
        var name = this.prefix + statType;
        this.collStat.insertOne({name: name, data: data});
    },
    // Shortcut. 
    counter: function (mapper, statType) {
        var data = this.mapReduce(mapper, REDUCER_COUNT);
        this.insert(statType, data)
    }
};

// Return "normalized" if the duid is normalized, otherwise null. 
function isNormalized(entities, duid) {
    return duid in entities && entities[duid]['entityId'].length > 0 ? 'normalized' : null;
}