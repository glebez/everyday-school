module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-combine-media-queries');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-replace');


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      style: {
        files: {
          'css/style.css': 'sass/style.scss'
        }
      },

      build: {
        files: {
          'build/css/style.css': 'sass/style.scss'
        }
      }
    },

    copy: {

      build: {
        files: [{
          expand: true,
          src: [
            '*.html',
            'img/**',
            'js/**',
            'fonts/**',
            'bower_components/**'
          ],
          dest: 'build',
        }]
      }
    },

    clean: {
      build: ['build']
    },

    autoprefixer: {
      options: {
        browsers: ["last 2 version", "ie 10"]
      },

      build: {
        src: "build/css/style.css"
      }
    },

    cmq: {
      options: {
        log: false
      },
      build: {
        files: {
          'build/css/': ['build/css/*.css']
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif,svg}"]
        }]
      }
    },

    cssmin: {
      build: {
        options: {
          keepSpecialComments: 0,
          report: "gzip"
        },

        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    replace: {
      build: {
        options: {
          patterns: [{
            match: /[\"\']css\/([^\"\']+).css[\"\']/g,
            replacement: '"css/$1.min.css"'
          }]
        },

        files: [{
          expand: true,
          src: ["build/*.html" ]
        }]
      }
    },

    watch: {
      style: {
          files: ['sass/*.scss', 'sass/**/*.scss'],
          tasks: ['sass:style'],
          options: {
            spawn: false
          }
      }
    }
  });

  grunt.registerTask('test', ['lintspaces:test']);

  grunt.registerTask('default', ['sass:style']);
  grunt.registerTask('build', ['clean:build', 'copy:build', 'sass:build', 'autoprefixer:build' , 'cmq:build', 'cssmin:build' , 'imagemin', 'replace:build']);
};
