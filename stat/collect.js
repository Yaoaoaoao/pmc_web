load('map_reduce_func.js');

/**
 * A constructo function that initializes new Stat objects.
 * If insert is called, map reduce result will be saved under 
 * db.collection.stat.statTypeName[_normalized]
 * @param {boolean|undefined} normalized_
 * @constructor
 */
function Stat(tool, collection, normalized_) {
    print(tool + '.' + collection);
    this.tool = tool;
    this.collection = collection;
    this.collData = new Mongo().getDB(tool).getCollection(collection);
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
    mapReduce: function(mapper, reducer, outCollection) {
        return this.collData.mapReduce(
            mapper, reducer, {
		out: {replace: outCollection},
		scope: {isNormalized: isNormalized,
		        normalized: this.normalized
		       }
	    });
    },
    // Shortcut. 
    counter: function(mapper, statType) {
	print('  -' + statType + this.suffix);
	var outColl = this.collection + '.stat.' + statType + this.suffix;
        var data = this.mapReduce(mapper, REDUCER_COUNT, outColl);
    }
};

// Return "normalized" if the duid is normalized, otherwise null. 
function isNormalized(entities, duid) {
    if (duid in entities && 'entityId' in entities[duid] && entities[duid]['entityId'].length > 0)
	return '_normed';
    else 
	return '_not_normed';
}
