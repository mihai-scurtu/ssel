var stylesheets = [];

$(function () {
	$('.sheet-title').on('click', function(e) {
		e.preventDefault();
		$(this).parent().find('.sheet-content').slideToggle();
	});
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.tabs.executeScript(tabs[0].id, {file: 'get_stylesheets.js'}, function(results) {
		stylesheets = stylesheets.concat(results[0]);

		for(var i = 0; i < stylesheets.length; i++) {
			var li = $(document.createElement('li'));

			var title = $(document.createElement('a'))
				.attr({
					href: '#',
				})
				.addClass('sheet-title')
				.text(stylesheets[i].filename);

			title.on('click', function(e) {
				e.preventDefault();
				$(this).parent().find('.sheet-content').slideToggle();
			});

			var content = $(document.createElement('div'))
				.addClass('sheet-content')
				.html(stylesheets[i].content.replace(/\n+/g, '<br>').replace(/(\t| +)g/, ''))
				.hide();
			$('#stylesheets').append(li.append(title).append(content));
		}
	});
});

