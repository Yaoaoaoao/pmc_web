// Add 0 charStart for the first sentence. The missing 0
// is caused by that we use nlputils (protobuf) to do
// sentence splitting, and it omits default value (0).

// db_name should be passed in via command line.
print('Processing normalized collection for db: ' + db_name);
conn = new Mongo();
db = conn.getDB(db_name);

cursor = db.normalized.find().forEach((doc) => {
    docid = doc['docId'];
    var fixed = false;
    doc['sentence'].forEach((sent) => {
	if(!('charStart' in sent)) {
	    sent['charStart'] = 0;
	    fixed = true;
	}
    });

    if (fixed)
	db.normalized.updateOne(
	    {docId: docid},
	    {$set: {sentence: doc['sentence']}}
	);    
});

