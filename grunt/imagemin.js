/**
 * Minify PNG, JPG, and GIF images.
 *
 * @link https://github.com/gruntjs/grunt-contrib-imagemin
 */
module.exports = {
	dynamic: {
		files: [{
			expand: true,
			cwd: '<%= pkg.dir.images %>',
			src: [
				'**/*.{png,jpg,gif}',
				'cover.jpg'
			],
			dest: '<%= pkg.dir.images %>',
		}]
	}
};
