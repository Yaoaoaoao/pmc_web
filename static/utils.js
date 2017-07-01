function textSection(text, entities, entityRelation) {
    var secs = [];
    var lastIndex = 0;
    Object.values(entities).sort((a, b) => {
        return a.charStart - b.charStart;
    }).forEach((e) => {
        secs.push({text: text.slice(lastIndex, e.charStart), isEntity: false});
        secs.push({
            text: text.slice(e.charStart, e.charEnd + 1), isEntity: true,
            id: e.duid, relations: entityRelation[e.duid]
        });
        lastIndex = e.charEnd + 1;
    });
    if (lastIndex <= text.length)
        secs.push({text: text.slice(lastIndex), isEntity: false});
    return secs;
}