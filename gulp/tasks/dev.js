'use strict';

var gulp = require('gulp');
var config = require('../config')();
var args = require('yargs').argv;
var log = require('../util/log');
var serve = require('../util/serve');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

var $ = require('gulp-load-plugins')({lazy: true});

/**
 * serve and watch the dev environment
 */
gulp.task('dev', function(done) {

    done = done || function() {};
    global.isDist = false;

    runSequence('clean-temp', ['lint', 'inject'], 'watch-dev', done);
});

gulp.task('watch-dev', function () {
    serve(true /*isDev*/);

    var watchFiles = config.watchFiles;
    if (args.nostylus) {
        watchFiles = config.watchFilesNoStylus;
    }
    /**
     * watch all app files except for index because
     * index is being injected in case of new files are added or deleted
     * (it would be an endless loop)
     */
    $.watch(watchFiles, function() {
        if (args.nostylus) {
            runSequence('clean-temp-js', ['lint', 'inject'], browserSync.reload);
        } else {
            runSequence('clean-temp-code', ['lint', 'inject'], browserSync.reload);
        }
    })
    .on('change', log.fileEvent);
});
