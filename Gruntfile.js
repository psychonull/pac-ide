'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*! \n* <%= pkg.title || pkg.name %> - v<%= pkg.version %>' +
            '\n* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> ' +
            '\n* <%= pkg.homepage ? pkg.homepage : "" %> ' +
            '\n*/ \n\n',

    paths: {
      src: "src/",

      appcss: "src/app/styles/",
      vendorcss: "src/vendor/styles/",

      dist: "dist/",
      distcss: "dist/css/",
    },

    clean: {
      before: {
        src: [
          "<%= paths.dist %>*",
          "!<%= paths.dist %>.gitignore"
        ],
      }
    },

    watch: {
      options: {
        livereload: 35729
      },
      browserified: {
        files: [
          '<%= paths.dist %><%= pkg.name %>.js'
        ],
        tasks: ['jshint']
      },
      styles: {
        files: [
          '<%= paths.appcss %>**/*'
        ],
        tasks: ['less']
      }
    },

    browserify: {
      all: {
        options:{
          extension: [ '.js', '.hbs' ],
          transform: [ 'hbsfy' ],
          debug: true
        },
        src: ['<%= paths.src %>index.js'],
        dest: '<%= paths.dist %><%= pkg.name %>.js'
      },
      watchify: {
        files: {
          '<%= paths.dist %><%= pkg.name %>.js': ['<%= paths.src %>index.js']
        },
        options: {
          extension: [ '.js', '.hbs' ],
          transform: [ 'hbsfy' ],
          debug: true,
          watch: true
        }
      }
    },

    concat: {
      all: {
        options: {
          stripBanners: {
            line: true
          },
          banner: '<%= banner %>'
        },
        files: {
          '<%= paths.dist %><%= pkg.name %>.js': [ '<%= paths.dist %><%= pkg.name %>.js' ]
        }
      },
      styles: {
        src: [
            '<%= paths.vendorcss %>bootstrap.min.css'
          , '<%= paths.vendorcss %>**/*.css'
         ],
        dest: '<%= paths.distcss %>vendor.css'
      },
    },

    uglify: {
      all: {
        options: {
          stripBanners: {
            line: true
          },
          banner: '<%= banner %>',
        },
        files: {
          '<%= paths.dist %><%= pkg.name %>.min.js': [ '<%= paths.dist %><%= pkg.name %>.js' ]
        }
      }
    },

    jshint: {
      all: {
        files: {
          src: ["<%= paths.src %>**/*.js"]
        },
        options: {
          jshintrc: '.jshintrc'
        }
      }
    },

    less: {
      all: {
        options: {
          banner: '<%= banner %>',
        },
        files: {
          "<%= paths.distcss %>app.css": [ "<%= paths.appcss %>app.less" ]
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8002,
          base: './dist',
        }
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, src: ['index.html'], dest: 'dist/'},
          {expand: true, src: ['assets/**'], dest: 'dist/'},
        ],
      },
    },

  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask("build", [
    "clean:before",
    "jshint",
    "browserify:all",
    "concat",
    "less",
    "copy"
  ]);

  grunt.registerTask("test", [
    "build",
    "connect"
  ]);

  grunt.registerTask("default", "w");
  grunt.registerTask("w", ["test", "browserify:watchify", "watch"]);
  grunt.registerTask("dist", ["test", "uglify"]);

};
