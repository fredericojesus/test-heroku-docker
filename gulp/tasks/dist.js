'use strict';

var gulp = require('gulp');
var config = require('../config')();
var log = require('../util/log');
var notify = require('../util/notify');
var serve = require('../util/serve');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

var $ = require('gulp-load-plugins')({lazy: true});

/**
 * serve and watch the build environment
 */
gulp.task('dist', function(done) {

    done = done || function() {};
    global.isDist = true;

    runSequence('clean-dist', ['optimize', 'images'], 'watch-dist', done);
});

gulp.task('watch-dist', function () {
    serve(false /*isDev*/);

    /**
     * watch all app files except for index because
     * index is being injected in case of new files are added or deleted
     * (it would be an endless loop)
     */
    $.watch(config.watchFiles, function() {
        runSequence('clean-dist', 'optimize', 'images', browserSync.reload);
    })
    .on('change', log.fileEvent);
});

/**
 * Build everything to distribution
 */
gulp.task('build-dist', function() {
    log.message('Building everything to distribution');

    global.isDist = true;

    runSequence('clean-dist', ['optimize', 'images'], endBuild);

    function endBuild() {
        var msg = {
            title: 'gulp build-dist',
            // subtitle: 'Running `dist`',
            message: 'Deployed to the dist folder'
        };

        log.message(msg);
        notify(msg);
    }
});

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
