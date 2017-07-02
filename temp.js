function transform(doc) {
    Object.keys(doc.relation).forEach((r) => {
        var relation = doc.relation[r];
        if (!('argument' in relation)) return;

        relation.docId = doc.docId;
        relation._argument = [];

        var sentences = {};
        relation.argument.map((arg) => {
            var entity = doc.entity[arg.entity_duid];
            entity.role = arg.role;
            relation._argument.push(entity);
            // Find sentence offset. 
            var sidx = entity.sentenceIndex;
            sentences[sidx] = doc.sentence[sidx];
        });
        
        delete relation.argument;
	relation.argument = relation._argument;
        [paragraph, adjust] = adjustOffset(doc.text, sentences);

        relation.text = paragraph;
        relation.argument.map((e) => {
            e.charStart -= adjust[e.sentenceIndex].minus;
            e.charEnd -= adjust[e.sentenceIndex].minus;
        });
        db.test.insertOne(relation);
    });
}

/**
 * {"index":1,  "charEnd":276,  "charStart":97 }
 * @param text
 * @param sentences
 * @return
 */
function adjustOffset(text, sentences) {
    var prev = 0;
    var paragraph = [];
    var seperator = ' ... ';
    Object.keys(sentences).sort().forEach((idx) => {
        var s = sentences[idx];
        paragraph.push(text.slice(s.charStart, s.charEnd + 1));
        sentences[idx]['minus'] = s.charStart + prev;
        prev += s.charEnd - s.charStart + 1 + seperator.length;
    });
    return [paragraph.join(seperator), sentences];
}


var db = new Mongo().getDB('rlims');
db.getCollection('test').drop()
db.normalized.find().limit(100).forEach((item) => {transform(item)});
