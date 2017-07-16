/**
 * Compile Sass into CSS using node-sass.
 *
 * @link https://github.com/sindresorhus/grunt-sass
 */
module.exports = {
	options: {
		outputStyle: 'expanded',
		sourceComments: false,
		sourceMap: true,
	},
	dist: {
		files: [{
			expand: true,
			cwd: '<%= pkg.dir.sass %>',
			src: 'style.scss',
			dest: '<%= pkg.dir.inc %>',
			ext: '.css'
		}]
	}
};
