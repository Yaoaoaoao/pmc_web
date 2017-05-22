var url = 'http://biotm2.cis.udel.edu:11000/raw/PMC4033429';
$.ajax({
    url: url,                                                                 
    dataType: 'json'
}).done(function(data){
    var json = eval(data);
    display_block(json[0]);
});      

function display_block(json) {
     $('#result').text(
//        JSON.stringify(json, null, 2)
	 'hello'
    );
}
