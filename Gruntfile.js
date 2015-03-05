module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
            'public/lib/underscore.js',
            'public/lib/jquery.js',
            'public/lib/backbone.js',
            'public/lib/handlebars.js',
            'public/client/app.js',
            'public/client/link.js',
            'public/client/links.js',
            'public/client/linkView.js',
            'public/client/linksView.js',
            'public/client/createLinkView.js',
            'public/client/router.js'
        ],
        dest: 'public/dist/app.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          bail: true,
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      static_mappings: {
        files: [
          {
            // src: 'public/lib/underscore.js', dest: 'public/dist/app.min.js' },
            // src: 'public/lib/jquery.js', dest: 'public/dist/app.min.js' },
            // src: 'public/lib/backbone.js', dest: 'public/dist/app.min.js' },
            // src: 'public/lib/handlebars.js', dest: 'public/dist/app.min.js' },
            src: 'public/dist/app.js', dest: 'public/dist/app.min.js' }
        ]
      }
    },

    jshint: {
      files: [
        'Gruntfile.js', 'public/dist/app.min.js'
      ],
      options: {
        force: 'false',
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js'
        ]
      }
    },

    cssmin: {
      target: {
        files: [{
          src: 'public/style.css', dest: 'public/dist/style.min.css'
        }]
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest',
    'jshint'
  ]);

  grunt.registerTask('build', [
    'mochaTest',
    'jshint',
    'concat',
    'cssmin',
    'uglify'
  ]);

  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      // add your production server task here
      ['concat',
      'cssmin',
      'uglify']
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
    'concat',
    'cssmin',
    'uglify'
  ]);


};
