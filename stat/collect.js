load('map_reduce_func.js');

/** 
 * A constructo function that initializes new Stat objects. 
 * @constructor 
 */
function Stat(tool, collection) {
    this.tool = tool;
    this.collection = collection;
    this.collData = new Mongo().getDB(tool).getCollection(collection);
    this.collStat = this.collData.getCollection('stat');
}

Stat.prototype = {
    basicCounts: function() {
	this.entityType();
	this.relationRole();
    },
    entityType: function() {
	this.counter(MAPPER_ENTITY_TYPE, 'entity_type');
    },
    relationRole: function() {
	this.counter(MAPPER_RELATION_ROLE, 'relation_role');
    },
    counter: function(mapper, statType) {
	var data = this.collData.mapReduce(
	    mapper, 
	    REDUCER_COUNT, 
	    {out: {inline: 1 }}
	);
	this.collStat.insertOne({name: statType, data: data});
    },
};
