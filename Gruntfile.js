'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-express-server');

    grunt.initConfig({

        express: {
            options: {
                script: 'server.js'
            },
            main: {}
        },

        watch: {
            express: {
                files: [
                    'server.js'
                ],
                tasks: ['express'],
                options: {
                    spawn: false
                }

            }
        }
    });

    grunt.registerTask('serve', [
        'express',
        'watch'
    ]);

    grunt.registerTask('default', ['serve'])
};
