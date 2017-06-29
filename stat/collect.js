load('map_reduce_func.js');

/**
 * A constructo function that initializes new Stat objects.
 * @constructor
 */
function Stat(tool, collection) {
    this.prefix = tool + '_' + collection + '_';
    this.collData = new Mongo().getDB(tool).getCollection(collection);
    this.collStat = new Mongo().getDB(tool).getCollection('stat');
}

Stat.prototype = {
    /**
     * @param {boolean|undefined} normalized_: count normalized entity vs. 
     * non-normalized.
     */
    entityType: function (normalized_) {
        this.counter(MAPPER_ENTITY_TYPE(normalized_), 'entity_type');
    },
    relationRole: function () {
        this.counter(MAPPER_RELATION_ROLE, 'relation_role');
    },
    counter: function (mapper, statType) {
        var name = this.prefix + statType;
        var data = this.collData.mapReduce(
            mapper,
            REDUCER_COUNT,
            {out: {inline: 1}}
        );
        this.collStat.insertOne({name: name, data: data});
    }
};

// Return if the duid is normalized. 
function isNormalized(entities, duid) {
    return duid in entities && entities[duid]['entityId'].length > 0;
}