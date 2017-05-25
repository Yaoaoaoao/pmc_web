var styleObj = cytoscape.stylesheet()
    .selector('node')
    .css({
        'content':'data(Label)',
        'font-family': 'Tahoma, Geneva, sans-serif',
        'font-size': '12',
        'font-weight':'bold',
        'text-halign':'center',
        'text-valign':'center',
        // 'text-opacity':'0.9',
        'text-outline-color':'#fff',
        'text-outline-width':'0',
        'shape':'circle',
        'height': '30',
        'width': '30',
        'opacity':'1',
        'border-width':'0',
        'border-color':'#e0e7ee',
        'background-color':'#e0e7ee',
        'text-wrap': 'wrap',
        'text-max-width': '60px'
    })
    .selector('edge')
    .css({
        'content':'data(Interaction)',
        'font-family': 'Arial',
        'font-size': '10',
        'font-weight':'normal',
        'width':'1',
	    'line-color': '#aaa',
	    'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
	    'target-arrow-color': '#aaa'
    })
    .selector(':selected')
    .css({
        'background-image':'none',
        'background-color':'#f9ff00',
        'border-color':'#e0e500',
        'text-outline-color':'#f9ff00',
        'text-outline-opacity':'0.1',
        'text-outline-width':'3'
    })
    .selector('edge:selected')
    .css({
        'background-color':'#f9ff00',
        'line-color':'#f9ff00',
        'source-arrow-color':'#f9ff00',
        'target-arrow-color':'#f9ff00',
        'width':'3'
    })
;