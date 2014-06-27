var stylesheets = [];

$('link[rel=stylesheet]').each(function(i) {
	var url = $(this).attr('href');
	var filename = url.split('/').slice(-1)[0];
	var content;

	// ignore cdn sheets
	if(!filename.match(/^\/\//)) {
		$.ajax({
			url: url,
			type: 'get',
			async: false,
			success: function(r) {
				content = r;
			} 
		});
		if(content) {
			stylesheets.push({'url': url, 'filename': filename, 'content': content});
		}
	}
});

stylesheets;