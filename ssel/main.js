var stylesheets = [];

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.tabs.executeScript(tabs[0].id, {file: 'get_stylesheets.js'}, function(results) {
		stylesheets = stylesheets.concat(results[0]);

		for(var i = 0; i < stylesheets.length; i++) {
			$('#stylesheets').append('<li>' + stylesheets[i].filename + '</li>');
		}
	});
});

