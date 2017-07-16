/**
 * Automatic Notifications when Grunt tasks fail.
 *
 * @link https://github.com/dylang/grunt-notify
 */
module.exports = {
	options: {
		enabled: true,
		max_jshint_notifications: 5,
		title: '<%= pkg.author.name %>',
		success: false,
		duration: 0.5,
	}
};
