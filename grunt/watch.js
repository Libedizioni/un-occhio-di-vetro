/**
 * Run tasks whenever watched files change.
 *
 * @link https://github.com/gruntjs/grunt-contrib-watch
 */
module.exports = {
	pdf: {
		files: [
			'templates/pdf/*.beamer',
			'templates/pdf/*.context',
			'templates/pdf/*.latex',
			'templates/pdf/*.tex'
		],
		tasks: ['shell:build_pdf'],
		options: {
			spawn: false,
			livereload: true,
		},
	},
	html: {
		files: [
			'inc/scss/**/*.scss',
			'templates/html/*.html',
			'templates/html/*.html5'
		],
		tasks: ['shell:build_html'],
		options: {
			spawn: false,
			livereload: true,
		},
	},
	epub: {
		files: [
			'templates/pdf/*.epub',
			'templates/pdf/*.epub3'
		],
		tasks: ['shell:build_epub'],
		options: {
			spawn: false,
			livereload: true,
		},
	},
	css: {
		files: ['inc/scss/**/*.scss'],
		tasks: [
			'styles',
			'shell:build_epub',
			'shell:build_html'
		],
		options: {
			spawn: false,
			livereload: true,
			debounceDelay: 250
		},
	},
	images: {
		files: ['inc/images/*'],
		tasks: ['imageminnewer'],
		options: {
			spawn: false,
			livereload: true
		},
	}
};
