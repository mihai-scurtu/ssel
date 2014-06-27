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

			var title = $(document.createElement('label'))
				.attr({
					'for': 'sheet' + i,
				})
				.addClass('sheet-title')
				.text(stylesheets[i].filename);

			var view = $(document.createElement('a'))
				.attr({
					href: '#'
				})
				.text('view');

			title.append(view);

			var checkbox = $(document.createElement('input'))
				.attr({
					type: 'checkbox',
					id: 'sheet' + i,
					value: i
				});

			view.on('click', function(e) {
				e.preventDefault();
				$(this).closest('li').find('.sheet-content').slideToggle();
			});

			var content = $(document.createElement('div'))
				.addClass('sheet-content')
				.html(stylesheets[i].content.replace(/\n+/g, '<br>').replace(/(\t| +)g/, ''))
				.hide();
			$('#stylesheets').append(li.append(checkbox).append(title).append(content));
		}

		if(stylesheets.length) {
			$('#generate').show();
		} else {
			$('#generate').hide();
		}
	});
});

