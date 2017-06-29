load('map_reduce_func.js');

/**
 * A constructo function that initializes new Stat objects.
 * If insert is called, map reduce result will be saved under db.collection.stat
 * with given name.
 * @param {boolean|undefined} normalized_
 * @constructor
 */
function Stat(tool, collection, normalized_) {
    print(tool, collection);
    this.tool = tool;
    this.collection = collection;
    this.collData = new Mongo().getDB(tool).getCollection(collection);
    this.collStat = this.collData.getCollection('stat');
    this.normalized = normalized_;
    this.suffix = normalized_ ? '_normalized' : '';
}

Stat.prototype = {
    entityType: function() {
        this.counter(MAPPER_ENTITY_TYPE, 'entity_type');
    },
    relationRole: function() {
        this.counter(MAPPER_RELATION_ROLE, 'relation_role');
    },
    mapReduce: function(mapper, reducer) {
        return this.collData.mapReduce(
            mapper, reducer, {
		out: {inline: 1},
		scope: {isNormalized: isNormalized,
		        normalized: this.normalized
		       }
	    });
    },
    insert: function(name, data) {
        this.collStat.insertOne({name: name, data: data});
    },
    // Shortcut. 
    counter: function(mapper, statType) {
	print('-' + statType);
        var data = this.mapReduce(mapper, REDUCER_COUNT);
        this.insert(statType + this.suffix, data)
    }
};

// Return "normalized" if the duid is normalized, otherwise null. 
function isNormalized(entities, duid) {
    if (duid in entities && 'entityId' in entities[duid] && entities[duid]['entityId'].length > 0)
	return '_normed';
    else 
	return '_not_normed';
}
