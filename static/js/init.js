(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$("#archivo_actualizacion").click(function(event) {
	$.ajax({
		url: '/centroslocal',
		type: 'GET',
		dataType: 'json',
		data: {},
	})
	.done(function(data) {
		var textToSave = JSON.stringify(data);

		var hiddenElement = document.createElement('a');

		hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
		hiddenElement.target = '_blank';
		hiddenElement.download = 'datos.js';
		hiddenElement.click();
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
	/* Act on the event */
});