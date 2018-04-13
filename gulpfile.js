'use strict';

const   gulp            = require('gulp'),
        sass            = require('gulp-sass'),
        concat          = require('gulp-concat'),
        autoprefixer    = require('gulp-autoprefixer'),
        rename          = require('gulp-rename'),
        sourcemaps      = require('gulp-sourcemaps');

const   browserSync     = require('browser-sync');

gulp.task('build-sass', () => {
    return gulp.src(['app/scss/build.sass'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function(){
    browserSync({
        server: {
            baseDir: './'
        },
    })
});

gulp.task('go', ['browserSync', 'build-sass'], function(){
    gulp.watch('app/scss/*',['build-sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/*.js', browserSync.reload);
});