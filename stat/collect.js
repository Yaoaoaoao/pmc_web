load('map_reduce_func.js');

class Stat {
    /**
     * Map reduce result will be saved under
     * db.collection.stat.statTypeName[_normalized]
     * @param {string} tool
     * @param {string} collection
     * @param {boolean|undefined} normalized_
     */
    constructor(tool, collection, normalized_) {
        print(tool + '.' + collection);
        this.collData = new Mongo().getDB(tool).getCollection(collection);
        this.statCollName = collection + '.stat.';
        this.normalized = normalized_;
        this.suffix = normalized_ ? '_normalized' : '';
    }

    entityType() {
        this.counter(MAPPER_ENTITY_TYPE, 'entity_type');
    }

    relationRole() {
        this.counter(MAPPER_RELATION_ROLE, 'relation_role');
    }

    relationArgs(mapper) {
        this.counter(mapper, 'relation_args');
    }

    mapReduce(mapper, reducer, outCollection) {
        return this.collData.mapReduce(
            mapper, reducer, {
                out: {replace: outCollection},
                scope: {
                    isNormalized: IS_NORMALIZED,
                    normalized: this.normalized
                }
            });
    }

    // Shortcut. 
    counter(mapper, statType) {
        print('  -' + statType + this.suffix);
        var outColl = this.statCollName + statType + this.suffix;
        this.mapReduce(mapper, REDUCER_COUNT, outColl);
    }
}

/**
 * Return "_normed" if the duid is normalized, otherwise null.
 * @param {Object} entities
 * @param {string} duid entity_duid
 * @return {string} '_normed' if entityId is not empty, otherwise '_not_normed'.
 *
 */
const IS_NORMALIZED = function(entities, duid) {
    if (duid in entities &&
        'entityId' in entities[duid] && entities[duid]['entityId'].length > 0)
        return '_normed';
    else
        return '_not_normed';
};
