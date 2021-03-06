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

      vendorwebkit: "src/vendor/webkit/",
      vendorwebkitName: "vendorwebkit.js",

      test: "test/client/",
      specs: "test/client/specs/",
      nodeTest: "test/node/",

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
      },
      tests: {
        files: [
          '<%= paths.test %>browserified_tests.js'
        ],
        tasks: ['mocha_phantomjs']
      },
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
          '<%= paths.dist %><%= pkg.name %>.js': ['<%= paths.src %>index.js'],
        },
        options: {
          extension: [ '.js', '.hbs' ],
          transform: [ 'hbsfy' ],
          debug: true,
          watch: true
        }
      },
      watchifyTests: {
        files: {
          '<%= paths.dist %><%= pkg.name %>.js': ['<%= paths.src %>index.js'],
          '<%= paths.test %>browserified_tests.js': ['<%= paths.test %>suite.js']
        },
        options: {
          extension: [ '.js', '.hbs' ],
          transform: [ 'hbsfy' ],
          debug: true,
          watch: true
        }
      },
      tests: {
        src: [ '<%= paths.test %>suite.js' ],
        dest: '<%= paths.test %>browserified_tests.js',
        options: {
          external: [ './<%= pkg.name %>.js' ],
          extension: [ '.js', '.hbs' ],
          transform: [ 'hbsfy' ],
          // Embed source map for tests
          debug: true
        }
      },
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
      vendorwebkit: {
        files: {
          '<%= paths.dist %><%= paths.vendorwebkitName %>': [ '<%= paths.vendorwebkit %>**/*' ]
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
          src: [
            "<%= paths.src %>**/*.js",
            "!<%= paths.src %>vendor/**/*.js"
          ]
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
      },
      test: {
        options: {
          port: 8002,
          base: '.',
          keepAlive: true
        }
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, src: ['index.html'], dest: 'dist/'},
          {expand: true, src: ['src/node/**'], dest: 'dist/'},
        ],
      },
    },

    mocha_phantomjs: {
      all: {
        options: {
          'reporter': 'spec',
          urls: ["http://localhost:8002/test/client/index.html"]
        }
      }
    },

    mochacov: {
      options: {
        files: '<%= paths.nodeTest %>**/*.js',
        ui: 'bdd',
        colors: true
      },
      unit: {
        options: {
          reporter: 'spec'
        }
      },
    },

    nodewebkit: {
      options: {
          platforms: ['win','linux64'],
          buildDir: './webkitbuilds', // Where the build version of my node-webkit app is saved
      },
      src: ['./dist/**/*'] // Your node-webkit app
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
  grunt.loadNpmTasks("grunt-mocha-phantomjs");
  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-mocha-cov');

  grunt.registerTask("build", [
    "jshint",
    "browserify:all",
    "concat",
    "less",
    "copy"
  ]);

  grunt.registerTask("site", [
    "build",
    "connect:server"
  ]);

  grunt.registerTask("test", [
    "build",
    "browserify:tests",
    "connect:test",
    "mocha_phantomjs"
  ]);

  grunt.registerTask("nt", [
    "mochacov",
  ]);

  grunt.registerTask("default", "w");

  grunt.registerTask("wt", ["test", "browserify:watchifyTests", "watch:tests"]);

  grunt.registerTask("w", ["site", "browserify:watchify", "watch"]);

  grunt.registerTask("webkit", ["build", "nodewebkit"]);

  grunt.registerTask("dist", ["site", "uglify"]);

};
