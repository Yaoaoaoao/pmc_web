// Normalize entities in a document using PubTator annotations.
// Require a collection pubtator.medline_aligned for PubTator
// annotations aligned with the raw text. It will normalize the
// collection db.aligned, which contains aligned text-mining
// results.

// db_name should be passed in via command line.
print('Normalize collection "aligned" for db: ' + db_name);
var conn = new Mongo();
var db = conn.getDB(db_name);
var pubtator = db.getSiblingDB('pubtator')

cursor = db.aligned.find().forEach((doc) => {
    var docid = doc.docId;
    var pbDoc = pubtator.medline_aligned.findOne({docId: docid});
    if (pbDoc === null)
	return;      
    
    var charEndMap = {};
    for (var key in pbDoc.entity) {
	var t = pbDoc.entity[key];
	charEndMap[t.charEnd] = t.entityId;
    }

    var normalized = false;
    for (var key in doc.entity) {
	var t = doc.entity[key];
	if (t.charEnd in charEndMap) {
	    t.entityId = charEndMap[t.charEnd];
	    normalized = true;
	}
	else if (t.entityText.slice(-1) == ')' && 
		 (t.charEnd - 1) in charEndMap) {
	    t.entityId = charEndMap[t.charEnd-1];
	    normalized = true;
	}
    }

    if (normalized)
	db.aligned.updateOne(
	    {docId: docid},
	    {$set: {entity: doc.entity}}
	);    
});

