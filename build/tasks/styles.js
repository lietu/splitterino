var gulp = require('gulp');
var sass = require('gulp-sass');
var paths = require('../paths');

gulp.task('styles', function () {
    gulp.src([paths.styles])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/'));
});
