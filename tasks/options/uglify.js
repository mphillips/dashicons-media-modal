module.exports = {
	all: {
		files: {
			'assets/js/dashicons-media-modal.min.js': ['assets/js/dashicons-media-modal.js']
		},
		options: {
			banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
			' * <%= pkg.homepage %>\n' +
			' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
			' * Licensed none' +
			' */\n',
			mangle: {
				except: ['jQuery']
			}
		}
	}
};
