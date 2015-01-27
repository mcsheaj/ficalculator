/* globals module:true */

module.exports = function (grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
			options: {
				sourceMap: true,
			},
			bootstrap: {
				src: 'css/bootstrap/less/bootstrap.less',
				dest: 'css/bootstrap/bootstrap.css',
			},
			fic: {
				src: 'css/main.less',
				dest: 'css/main.css',
			},
		},
		watch: {
			options: {
				interrupt: true,
				livereload: true,
			},
			files: ["css/**/*.less"],
			tasks: ['less'],
		},
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['less']);

};
