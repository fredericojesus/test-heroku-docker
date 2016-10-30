'use strict';

module.exports = function () {
    var src = './src/';
    var app = src + 'app/';
    var dist = './dist/';
    var temp = './.tmp/';

    var config = {

        //Files paths
        alljs: [
            './src/**/*.js',
            './*.js',
            './gulp/**/*.js'
        ],
        src: src,
        css: temp + '**/*.css',
        dist: dist,
        htmltemplates: app + '**/*.html',
        index: 'index.html',
        images: src + 'images/**/*.*',
        js: [
            app + '**/*.module.js',
            app + '**/*.js',
            temp + '*.js',
        ],
        root: './',
        stylus: src + '**/*.styl',
        temp: temp,

        //files to watch in dev environment
        watchFiles: [
            app + '**/*.js',
            app + '**/*.html',
            src + '**/*.styl',
            app + '**/*.styl'
        ],

        //files to watch in dev environment without stylus
        watchFilesNoStylus: [
            app + '**/*.js',
            app + '**/*.html'
        ],

        //optimized files
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },

        //template cache
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app',
                root: 'app/',
                standAlone: false
            }
        },

        //bower and npm locations
        bower: {
            json: require('../bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        }
    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
};
