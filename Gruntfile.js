module.exports = function (grunt) {

	grunt.registerTask('test', [
		'clean:test', 
		'browserify:test',
		'karma:test'
	]);

	grunt.registerTask('example', function (file) {
		grunt.task.run(
			'clean:example', 
			'browserify:example-simple',
			'browserify:example-complex',
			'livereload-start',
			['open'].concat([file]).join(':'),
			'regarde'
		);
	});

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		browserify: {
			test: {
				src: ['test/test.js'],
				dest: 'test/built/test.js'
			},
			'example-simple': {
				src: ['example/simple.js'],
				dest: 'example/built/simple.js'
			},
			'example-complex': {
				src: ['example/complex.js'],
				dest: 'example/built/complex.js'
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
			simple: {path: 'example/simple.html'},
			complex: {path: 'example/complex.html'}
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
