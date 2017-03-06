# gulp-sassdoc-2-json

## NOTE: This project is still a work-in-progress

A gulp plugin to parse SassDoc documentation into a JSON file.

Supports CSS, LESS, STYLUS, SASS and SCSS comment block syntax.

```javascript
var gulp = require( 'gulp' );
var dss = require( 'gulp-dss' );

gulp.task( 'dss', function() {
  return gulp.src( './source/styles/**/*.{sass,scss,less,css,js}' )
    .pipe( dss('outputFileName.json'))
    .pipe( gulp.dest( './docs/' ) );
});
```

