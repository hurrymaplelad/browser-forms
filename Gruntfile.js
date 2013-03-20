module.exports = function (grunt) {

	grunt.registerTask('test', [
		'clean:test', 
		'browserify:test',
		'karma'
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
				src: ['test/test.js'],
				dest: 'test/built/test.js'
			},
			example: {
				src: ['example/simple.js'],
				dest: 'example/built/simple.js'
			}
		},

		karma: {
      test: {
        configFile: 'karma.conf.js',
        singleRun: true,
        reporters: ['dots']
      }
    },

		clean: {
			test: 'test/built',
			example: 'example/built'
		},

		open: {
			example: {path: 'example/simple.html'},
		},

		regarde: {
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

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-livereload');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-regarde');
};
