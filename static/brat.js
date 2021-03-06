function brat(data, id) {
    // var bratLocation = "{{ url_for('static', filename='') }}";
    var bratLocation = "/static/";
    console.log(bratLocation);
    head.js(
        // External libraries
        bratLocation + 'client/lib/jquery.min.js',
        bratLocation + 'client/lib/jquery.svg.min.js',
        bratLocation + 'client/lib/jquery.svgdom.min.js',

        // brat helper modules
        bratLocation + 'client/src/configuration.js',
        bratLocation + 'client/src/util.js',
        bratLocation + 'client/src/annotation_log.js',
        bratLocation + 'client/lib/webfont.js',

        // brat modules
        bratLocation + 'client/src/dispatcher.js',
        bratLocation + 'client/src/url_monitor.js',
        bratLocation + 'client/src/visualizer.js'
    );

    var webFontURLs = [
        bratLocation + 'static/fonts/Astloch-Bold.ttf',
        bratLocation + 'static/fonts/PT_Sans-Caption-Web-Regular.ttf',
        bratLocation + 'static/fonts/Liberation_Sans-Regular.ttf'
    ];

    var collData = {
        entity_types: [{
            type: 'Person',
            /* The labels are used when displaying the annotion, in this case
             we also provide a short-hand "Per" for cases where
             abbreviations are preferable */
            labels: ['Person', 'Per'],
            // Blue is a nice colour for a person?
            bgColor: '#7fa2ff',
            // Use a slightly darker version of the bgColor for the border
            borderColor: 'darken'
        }]
    };

    collData['relation_types'] = [{
        type: 'Anaphora',
        labels: ['Anaphora', 'Ana'],
        // dashArray allows you to adjust the style of the relation arc
        dashArray: '3,3',
        color: 'purple',
        /* A relation takes two arguments, both are named and can be constrained
         as to which types they may apply to */
        args: [
            // 
            {role: 'Anaphor', targets: ['Person']},
            {role: 'Entity', targets: ['Person']}
        ]
    }];

    head.ready(function () {
        Util.embed(
            // id of the div element where brat should embed the visualisations
            id,
            // object containing collection data
            collData,
            // object containing document data
            data,
            // Array containing locations of the visualisation fonts
            // webFontURLs 
            webFontURLs
        );
    });
}