'use strict'

var gulp = require('gulp');
var dss = require('./index');

gulp.task('default', function() {
  return gulp.src('./examples/foo.sass')
    .pipe(dss('output.json'))
    .pipe(gulp.dest('./docs/'))
});
