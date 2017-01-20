'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');

gulp.task('lint-js', () => {
    return gulp.src(['./app.js', './Shell.js', './dialogs/*.js', './recognizers/*.js', './utils/*.js', './admin/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('test', (callback) => {
    runSequence('lint-js', callback);
});

gulp.task('default', (callback) => {
    runSequence('test', callback);
});