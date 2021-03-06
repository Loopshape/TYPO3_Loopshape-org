/* --------------------------------------------------
* Backbone/Require.JS for GRUNT + COMPOSER SKELETON
*
* Assembled by Arjuna Noorsanto
* (R)2014 Hamburg / Germany
*
* http://loopshape.org/
* --------------------------------------------------
*
* PS: The baseUrl in the config must be the same, according to the ROOT domain!
*
* for reference for the Grunt config go to:
* https://github.com/jrburke/r.js/blob/master/build/example.build.js
*/

// define Grunt process
module.exports = function(grunt) {
    "use strict";

    // Project configuration
    grunt.initConfig({

        // the Grunt work-folder
        baseUrl : "./Templates/js",

        // loads the Node dependencies
        pkg : grunt.file.readJSON("./package.json"),

        // the main config for the directories
        cfg : {
            // the directory for the app within the javascript-assets-dir
            app : "<%= baseUrl %>/app",
            // the plugins dir for the app
            lib : "<%= baseUrl %>/app/lib",
            // the core files for jQuery, Require.js and Backbone+Underscore
            core : "<%= baseUrl %>/app/core",
            // the temporary dir within the app path
            tmp : "<%= baseUrl %>/app/tmp",
        },

        // set encoding to UTF8
        encoding : {
            options : {
                encoding : 'UTF8'
            },
            files : {
                src : ['<%= cfg.app %>/**/*'],
            }
        },

        // set the debugger + read the debugger config-file
        jshint : {
            options : require("./Templates/js/app/jshintrc.json").options
        },

        // concatenate working files for JS / CSS
        concat : {
            options : {
                encoding : 'utf-8',
                separator : ";",
                //line : true,
                //block : true,
                //stripBanners : true,
                //banner : "/*! <%= pkg.name %> - v<%= pkg.version %> - " + "<%= grunt.template.today('yyyy-mm-dd') %> */"
            },
            missing : {
                nonull : true
            },
            js : {
                src : ["<%= cfg.dir %>/core/underscore-min.js", "!<%= cfg.dir %>/core/backbone-min.js", "<%= cfg.dir %>/core/jquery-2.0.3.min.js", "<%= cfg.lib %>/lib/**/*min.js", "<%= cfg.app %>/class/**/*.js"],
                dest : "<%= cfg.tmp %>/_concat.js"
            },
            css : {
                src : [],
                dest : "<%= cfg.tmp %>/_.concat.css"
            }
        },

        // parse JS and compress
        uglify : {
            pack : {
                options : {
                    preserveComments : 'all',
                    mangle : false,
                    beautify : false,
                    report : false,
                    compress : true,
                },
                files : [{
                    src : "<%= concat.js.dest %>",
                    dest : "<%= baseUrl %>/script.min.js"
                }]
            }

        },

        // the require.js config
        requirejs : {
            compile : {
                options : {
                    baseUrl : "<%= baseUrl %>",
                    name : "app",
                    mainConfigFile : "<%= baseUrl %>/main.js",
                    out : "<%= baseUrl %>/script.min.js"
                }
            }
        },

        // use Compass for SASS files
        compass : {
            compile : {
                options : {
                    sassDir : "./Templates/scss",
                    cssDir : "<%= cfg.tmp %>",
                    environment : "production"
                }
            }
        },

        // minify CSS for production usage
        cssmin : {
            minify : {
                expand : false,
                src : ["<%= cfg.tmp %>/**/*.css"],
                dest : "./Templates/css/main.css"
            }
        },

        // copy build-files to "public/build" dir if needed
        copy : {
            js : {
                files : [{
                    expand : false,
                    flatten : true,
                    src : ['<%= cfg.tmp %>/*.js'],
                    dest : './js/build/',
                    filter : 'isFile'
                }]
            },
            css : {
                files : [{
                    expand : false,
                    flatten : true,
                    src : ['<%= cfg.tmp %>/*.css'],
                    dest : './js/build/',
                    filter : 'isFile'
                }]
            }
        },

        // delete "tmp" dir after processing JS/SASS/CSS files
        clean : {
            options : {
                force : true
            },
            stuff : ["<%= cfg.tmp %>"]
        },

        sshconfig : {
            loopshape : {
                host : 'loopshape.org',
                username : 'root',
                agent : process.env.SSH_AUTH_SOCK,
                agentForward : true
            }
        },

        sshexec : {
            deploy : {
                command : ['cd /server/website/production', 'git pull origin master', 'cd /server/website/data', 'git pull origin master'].join(' && '),
                options : {
                    config : 'loopshape'
                }
            }
        },

        watch : {
            scripts : {
                files : ["./main.js", "<%= cfg.app %>/app.js", "<%= cfg.app %>/class/**/*.js"],
                tasks : ["jshint", "requirejs", "concat:js", "uglify:pack"],
                options : {
                    spawn : true
                },
            },
            css : {
                files : ["./Templates/scss/**/*"],
                tasks : ["concat:css", "jshint", "compass:compile", "cssmin"],
                options : {
                    livereload : true
                }
            }
        }

    });

    // Load the plugins
    grunt.loadNpmTasks("grunt-encoding");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-compass");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-ssh');

    // default task
    grunt.registerTask("default", "watch");

    // register tasks
    grunt.registerTask("js", ["jshint", "requirejs"]);
    grunt.registerTask("css", ["jshint", "concat:css", "compass:compile", "cssmin", "clean"]);

    // deploy task
    grunt.registerTask("deploy", ["sshexec:deploy"]);

};
