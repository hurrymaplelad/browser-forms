module.exports = function (grunt) {

	grunt.registerTask('test', [
		'clean:test', 
		'browserify2:test',
		'karma:test'
	]);

	grunt.registerTask('example', function (file) {
		grunt.task.run(
			'clean:example', 
			'browserify2:example-simple',
			'browserify2:example-complex',
			'livereload-start',
			['open'].concat([file]).join(':'),
			'regarde'
		);
	});

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		browserify2: {
			test: {
				entry: './test/test.js',
				compile: './test/built/test.js'
			},
			'example-simple': {
				entry: './example/simple.js',
				compile: './example/built/simple.js',
				debug: true
			},
			'example-complex': {
				entry: './example/complex.js',
				compile: './example/built/complex.js',
				debug: true
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
					'example/*.js',
					'lib/**/*.js'
				],
				tasks: [
					'browserify2:example-simple',
					'browserify2:example-complex',
					'livereload'
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-browserify2');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-livereload');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-regarde');
};
