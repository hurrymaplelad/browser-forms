module.exports = function (grunt) {

	grunt.registerTask('test', [
		'clean:test', 
		'browserify:test',
		'copy:test',
		'livereload-start',
		'open:test',
		'regarde'
	]);

	grunt.registerTask('example', [
		'clean:example', 
		'browserify:example',
		'livereload-start',
		'open:example',
		'regarde'
	]);
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		browserify: {
			test: {
				prepend: ['node_modules/nodeunit/examples/browser/nodeunit.js'],
				src: ['test/test.js'],
				dest: 'test/built/test.js'
			},
			example: {
				src: ['example/simple.js'],
				dest: 'example/built/simple.js'
			}
		},

		clean: {
			test: 'test/built',
			example: 'example/built'
		},

		copy: {
			test: {
				src: 'node_modules/nodeunit/share/nodeunit.css',
				dest: 'test/built/nodeunit.css'
			}
		},

		open: {
			test: {path: 'test/test.html'},
			example: {path: 'example/simple.html'},
		},

		regarde: {
			testjs: {
				files: 'test/**/*.js',
				tasks: [
					'browserify:test',
					'livereload'
				]
			},
			examplejs: {
				files: [
					'example/**/*.js',
					'lib/**/*.js'
				],
				tasks: [
					'browserify:example',
					'livereload'
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-livereload');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-regarde');
};
