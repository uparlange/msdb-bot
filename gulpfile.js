'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');

gulp.task('lint-js', () => {
    return gulp.src(['./app.js', './dialogs/*.js', './recognizers/*.js', './utils/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(eslint.result(result => {
            console.log(`ESLint ${result.filePath} [Messages : ${result.messages.length}, Warnings : ${result.warningCount}, Errors : ${result.errorCount}]`);
        }));;
});

gulp.task('test', (callback) => {
    runSequence('lint-js', callback);
});

gulp.task('default', (callback) => {
    runSequence('test', callback);
});