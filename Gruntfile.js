module.exports = function( grunt ) {

	// Load configurations from project package.json
	require( 'load-grunt-config' )( grunt, {
		data: {
			pkg: grunt.file.readJSON( 'package.json' ),
			book: grunt.file.readJSON( 'book-config.json' )
		}
	});

	// Load all grunt tasks from main repo package.json,
	require( 'load-grunt-tasks' )( grunt, {
		pattern: ['grunt-*', 'css-mqpacker', 'glob'],
		config: '../package.json',
		requireResolution: true
	});

	// Load needed node_modules from htdocs folder
	grunt.loadNpmTasks( 'load-grunt-tasks' );

};
