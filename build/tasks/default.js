var gulp = require('gulp');

// Declare "watch" as the default task
gulp.task('default', ['copy-deps', 'build-system', 'build-html', 'styles', 'watch']);
