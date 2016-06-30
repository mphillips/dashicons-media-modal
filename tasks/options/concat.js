module.exports = {
	options: {
		stripBanners: true,
			banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
		' * <%= pkg.homepage %>\n' +
		' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
		' * Licensed none' +
		' */\n'
	},
	dashicons: {
		options: {
			banner:
				"( function( $, window, wp, undefined ) { \n" +
				"	'use strict'; \n\n",
			separator: '\n',
			footer: '\n})( jQuery, window, wp );'
		},
		src: [
			'assets/js/src/templates.js',
			'assets/js/src/dashicon-item.js',
			'assets/js/src/dashicon-collection.js',
			'assets/js/src/dashicons-media-item-view.js',
			'assets/js/src/dashicons-media-item-view.js',
			'assets/js/src/dashicon-view.js',
			'assets/js/src/dashicons-media-toolbar.js',
			'assets/js/src/dashicons-media-frame-view.js',
			'assets/js/src/dashicons-media-frame.js',
			'assets/js/src/dashicons-media-frame-controller.js',
			'assets/js/src/app.js',
		],
			dest: 'assets/js/dashicons-media-modal.js'
	}
};
