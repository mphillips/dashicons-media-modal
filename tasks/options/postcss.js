module.exports = {
	dist: {
		options: {
			processors: [
				require('autoprefixer')({browsers: 'last 2 versions'})
			]
		},
		files: {
			'assets/css/dashicons-media-modal.css': [ 'assets/css/dashicons-media-modal.css' ]
		}
	}
};
