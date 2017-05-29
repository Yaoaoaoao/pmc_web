var windowWidth = $(window).width();
var windowHeight = $(window).height();

function cyto_init(eleObj, id, test) {
    //initializied functions
    options = {
        showOverlay: false,
        zoom: 1,
        zoomingEnabled: false,
        layout: {
            name: 'cola', 
	        fit: true,
            avoidOverlap: true,
            nodeSpacing: function( node ){ return 10; },
        },
        elements: eleObj,
        style: styleObj,
        ready: function () {
            window.cy = this;
        }
    };
    //start cytoscape visualization
    $('#' + id).cytoscape(options);

    // set mouse interactions
    mouse_hover();
    left_click(test);
}

function mouse_hover() {
    // mouse hover to view first neighbor
    var cy = $("#cy").cytoscape("get");
    cy.$('node').on('mouseover', function (e) {
        var firstNeighbor = e.cyTarget.closedNeighborhood();
        cy.$().css('opacity', '0.1');
        firstNeighbor.css('opacity', '1');
    });
    cy.$('node').on('mouseout', function (e) {
        cy.$('node').css('opacity', '1');
        cy.$('edge').css('opacity', '0.8');
    });
}

function left_click(test) {
    //left click to show property table
    var cy = $("#cy").cytoscape("get");
    cy.on('tap', function (e) {
        if (e.cyTarget === cy){
            cy.$().unselect();
            $("#property").hide();
            cy.$('node').css({
                'opacity': '1',
                'border-width': 0
            });
        }
    });
    cy.$('node').on('tap', function (e) {
        e.cyTarget.select();
        test(e.cyTarget.data().id, 'entity');
    });
    cy.$('edge').on('tap', function (e) {
        e.cyTarget.select();
        test(e.cyTarget.data().id, 'relation');
    });
}


function cyto_highlight(duid, type) {
    var cy = $("#cy").cytoscape("get");
    cy.$().deselect();
    var ele = cy.$('[id="' + duid + '"]');
    ele.select();
    if (type == 'relation') {
        ele.connectedNodes().select();
    }
}