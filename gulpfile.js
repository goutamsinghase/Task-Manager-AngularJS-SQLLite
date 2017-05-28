'use strict';
var gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-clean-css'),
    browserSync= require('browser-sync'),
    browserify = require('gulp-browserify'),
    stringify = require('stringify'),
    uglify = require('gulp-uglify'),
    del =require('del'),
    env = process.env.NODE_ENV || 'development',
    outputClientDir = 'www',
    inputDir = 'app',

    options = {
        libjs: [
            'bower_components/angular/angular.min.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
        ],
        libCss: [
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'bower_components/component-font-awesome/css/font-awesome.min.css'
        ]
    };


gulp.task('assets', function() {
    return gulp.src(inputDir + '/resources/**/*')
        .pipe(gulp.dest(outputClientDir + '/resources'));
});

gulp.task('html', function() {
    return gulp.src(inputDir + '/index.html')
        .pipe(gulp.dest(outputClientDir));
});


gulp.task('css', function() {
    gulp.src(options.libCss)
        .pipe(cssmin())
        .pipe(rename('vendor.min.css'))
        .pipe(gulp.dest(outputClientDir + '/css'));
});


gulp.task('sass', function() {
    var config = {};
    if (env === 'production') {
        config.outputStyle = 'compressed';
    }
    return gulp.src(inputDir + '/sass/app.scss')
        .pipe(sass(config))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(outputClientDir + '/css'));
});


gulp.task('js', function() {
    return gulp.src(inputDir + '/scripts/app.js', {
            read: false
        })
        .pipe(browserify({
            transform: stringify({
                extensions: ['.html', '.tpl'],
                minify: true
            })
        }))
        .pipe(gulpIf(env !== 'development', uglify()))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(outputClientDir + '/js'));
});

gulp.task('vendor', function() {
    return gulp.src(options.libjs)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(outputClientDir + '/js'));
});

gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: './www'
        },
        ui: {
            port: 8080,
            weinre: {
                port: 9090
            }
        }

    });
});

gulp.task('clean', function() {
    del.sync(['www/**']);
});

gulp.task('watch', function() {
    gulp.watch('./app/scripts/**/*.js', ['js']);
    gulp.watch('./app/scripts/**/*.html', ['js']);
    gulp.watch(inputDir + '/index.html', ['html']);
    gulp.watch(inputDir + '/sass/**/*.scss', ['sass']);
    gulp.watch(inputDir + '/css/**/*.css', ['css']);
    gulp.watch(inputDir + '/resources/images/*', ['assets']);
    gulp.watch(inputDir + '/resources/fonts/*', ['fonts']);
});

gulp.task('serve', ['build', 'server'], function() {
    return gulp.watch([
        './app/index.html',
        './app/sass/**/*.scss',
        './app/scripts/**/*.js',
        './app/scripts/**/*.html'
    ], [
        'build', browserSync.reload
    ]);
});

gulp.task('default', ['assets', 'html', 'sass', 'css', 'js', 'vendor', 'watch']);
gulp.task('build', ['assets', 'html', 'sass', 'css', 'js', 'vendor', 'watch']);
