/**
 * Produce images at different sizes for responsive websites.
 *
 * @link https://github.com/andismith/grunt-responsive-images/
 * @TODO update responsive images sizes to create for epub3 format
 */
module.exports = {
	cover: {
		options: {
			sizes: [{
				width: 480,
				aspectRatio: true
			}, {
				width: 640,
				aspectRatio: true
			}, {
				width: 960,
				aspectRatio: true
			}, {
				width: 1200,
				aspectRatio: true
			}, {
				width: 1400,
				aspectRatio: true
			}],
			engine: 'im',
			quality: 82
		},
		files: [{
			expand: true,
			cwd: '<%= pkg.dir.images %>',
			src: [
				'cover.jpg',
			],
			dest: '<%= pkg.dir.images %>/cover',
		}]
	},
	figures: {
		options: {

			// Useful fluid sizes can be as follows
			sizes: [{
				width: 400
			}, {
				width: 620
			}, {
				width: 785
			}, {
				width: 980
			}, {
				width: 1080
			}, {
				width: 1280
			}, {
				width: 1600
			}, {
				width: 1920
			}],
			engine: 'im',
			quality: 78
		},
		files: [{
			expand: true,
			cwd: '<%= pkg.dir.images %>',
			src: [
				'*.jpg',
				'*.png',
				'*.gif',
				'!cover.jpg'
			],
			dest: '<%= pkg.dir.images %>',
		}]
	}
};
