var stylesheets = [];

$('link[rel=stylesheet]').each(function(i) {
	var url = $(this).attr('href');
	var filename = url.split('/').slice(-1)[0];
	stylesheets.push({'url': url, 'filename': filename});
});

stylesheets;