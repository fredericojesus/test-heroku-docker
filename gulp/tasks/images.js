'use strict';

var gulp = require('gulp');
var config = require('../config')();
var log = require('../util/log');

var $ = require('gulp-load-plugins')({lazy: true});

/**
 * Copy images
 * @return {Stream}
 */
gulp.task('images', function() {
    log.message('Copying images');

    return gulp
        .src(config.images)
        .pipe(gulp.dest(config.dist + 'images'));
});
