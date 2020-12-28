'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
    return gulp.src('task1/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('task1/css/'));
});
 
gulp.task('sass:watch', function () {
    gulp.watch('task1/sass/*.scss', gulp.series('sass'));
});