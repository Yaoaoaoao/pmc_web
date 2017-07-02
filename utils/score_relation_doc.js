// Score each relation in relation-centric collection and
// aggregate scores for each document.


function score_rlims(relation) {
    var score = 0;
    relation['argument'].forEach((arg) => {
	switch (arg['role']) {
	case 'SUBSTRATE':
	    score += 200;
	    break;
	case 'KINASE':
	    score += 100;
	    break;
	case 'SITE':
	    if (arg['entityText'].search('-') > -1)
		score += 25;
	    else
		score += 10;
	    break;

	};
    });
    return score;
}

function score_efip(relation) {
    var score = 0;
    relation['argument'].forEach((arg) => {
	switch (arg['role']) {
	case 'SUBSTRATE':
	    score += 200;
	    break;
	case 'INTERACTANT':
	    score += 200;
	    break;
	case 'KINASE':
	    score += 100;
	    break;
	case 'SITE':
	    if (arg['entityText'].serach('-') > -1)
		score += 25;
	    else
		score += 10;
	    break;
	};
    });
    return score;
}

function score_mirtex(relation) {
    var score = 0;

    if (relation['relationType'] == 'MIRNA2TARGET')
	score += 2;
    else
	score += 1;
        
    if (is_relaxed)
        score += 1

    relation['attribute'].forEach((a) => {
	if (attr['value'] == 'direct' && attr['value'] == 'direct')
	    score += 1;
	if (attr['value'] == 'relaxed_rule')
	    score -= 2;
    });

    return score;
}


// db_name should be passed in via command line.
var db_name = 'rlims'
print('Scoring for db: ' + db_name);
var conn = new Mongo();
var db = conn.getDB(db_name);


// Change 'test' to proper collection name later.
db.test.find().forEach((relation) => {
    var score;
    switch (db_name) {
    case 'rlims':
	score = score_rlims(relation);
	break;
    case 'efip':
	score = score_efip(relation);
	break;
    case 'rlims':
	score = score_mirtex(relation);
	break;

    };
    print(score);
    db.test.updateOne(
	{$and: [{docId: relation['docId']}, 
		{duid: relation['duid']}]},
	{$set: {score: score}});
});

