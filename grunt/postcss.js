/**
 * Apply several post-processors to CSS using PostCSS.
 *
 * @link https://github.com/nDmitry/grunt-postcss
 */
module.exports = {
	options: {
		map: true,
		processors: [
			require('css-mqpacker')({ sort: true }),
	]},
	dist: {
		src: ['<%= pkg.dir.inc %>/style.css', '!*.min.js']
	}
};
