module.exports = {
	options: {
		banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
		' * <%=pkg.homepage %>\n' +
		' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
		' * Licensed none' +
		' */\n'
	},
	minify: {
		expand: true,

		cwd: 'assets/css/',
		src: [
			'dashicons-media-modal.css'
		],

		dest: 'assets/css/',
		ext: '.min.css'
	}
};
