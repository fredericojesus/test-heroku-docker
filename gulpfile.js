'use strict';

/*
 * gulpfile.js
 * -----------
 * Any file in the gulp folder gets automatically required
 * by the loop in ./gulp/index.js
 *
 * To add a new task just add it to gulp/tasks
 */

global.isProd = false;

require('./gulp');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('serve-dist', function() {
    global.isDist = true;

    runSequence('clean-dist', ['optimize', 'images'], serveBuild);

    function serveBuild() {
        $.connect.server({
            root: 'dist',
            port: process.env.PORT || 5000,
            livereload: false
        });
    }
});
