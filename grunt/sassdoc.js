/**
 * Create theme Sass documentation.
 *
 * @link https://github.com/SassDoc/grunt-sassdoc
 */
module.exports = {
	default: {
		src: [
			'inc/scss/**/*.scss'
		],
		options: {
			dest: 'inc/sass_doc/',
			package: './package.json',
			display: {
				access: ['public'],
				alias: true,
				watermark: true
			},
			autofill: ['throw', 'content', 'require'],
			groups: {
				mixins: 'Mixins',
				functions: 'Functions',
				colors_bw: 'Color variables: B&W color palette',
				colors_gray: 'Color variables: Grayscale color palette',
				colors_peace: 'Color variables: Peace color palette',
				typography: 'Typography and Font defaults'
			},
			description: 'Sass Documentation: <%= pkg.title %> - v<%= pkg.version %>. All mixins, variables and functions are listed here for reference, as well as some useful informations'
		}
	}
};
