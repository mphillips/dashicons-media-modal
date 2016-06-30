module.exports = {
	main: {
		options: {
			mode: 'zip',
			archive: './release/dashicons_mm.<%= pkg.version %>.zip'
		},
		expand: true,
		cwd: 'release/<%= pkg.version %>/',
		src: ['**/*'],
		dest: 'dashicons_mm/'
	}
};
