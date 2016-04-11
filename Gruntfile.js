module.exports = function(grunt){
  'use strict';

  grunt.initConfig({

    connect: {
      server: {
        options: {
          port: 8888,
          base: '.'
        }
      }
    },

    mocha: {
        all: {
          options: {
              urls: ['http://localhost:8888/test/repos.html']
        // make html files for all test harnesses
        // if (navigator.userAgent.indexOf('PhantomJS') < 0) {
        //   mocha.run(); - put this in text harness !!!
        // }

        }
      }
    },

    jshint: {
      options:{
        jshintrc: true
      },
      all:[ 'js/*.js' ]

    },

    sass:{
      project:{
        files:{
          'dist/css/main.css': 'scss/main.scss'

        }
      }
    },

    watch:{
      js: {
        files: ['js/*.js'],
        tasks: ['js-build']
      },
      sass:{
        files: ['scss/**/*.scss'],
        tasks: ['css-build']
      },
      html: {
        files:['*.html'],
        tasks:['copy:html']
      }
    },
    clean: ['dist/'],

    copy: {
      html: {
        expand: true,
        src:['*.html'],
        dest: 'dist/'
      },

      vendorjs:{
        expand: true,
        src: ['*.html'],
        dest: 'dist/',
        cwd: 'js/vendor/jquery/dist/'
      }
    },

    concat: {
      options: {
        separator: ';',
        sourceMap: true
      },
      js: {
        src:['js/*.js'],
        dest: 'dist/js/app.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-connect');


  grunt.registerTask('js-build', ['jshint', 'concat:js']);
  grunt.registerTask('css-build', ['sass']);
  grunt.registerTask('default', ['clean', 'copy', 'test', 'js-build', 'css-build']);
  grunt.registerTask('test', ['connect', 'mocha']);


};
