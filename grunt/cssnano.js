/**
 * A modular minifier, built on top of the PostCSS ecosystem.
 *
 * @link https://github.com/ben-eb/cssnano
 */
module.exports = {
	options: {
		banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
			' * <%= pkg.homepage %>\n' +
			' * Copyright © <%= grunt.template.today("yyyy") %>;' +
			' * Licensed GPLv3+' +
			' */\n',
		safe: true,
	},
	style: {
		expand: true,
		cwd: '<%= pkg.dir.inc %>',
		src: [
			'style.css',
			'!*.css.map',
			'!*.min.css',
		],
		dest: '<%= pkg.dir.inc %>',
		ext: '.min.css'
	},
};
