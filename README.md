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

Depending on your documentation, this will output a JSON file that looks something like:

```json
[
  {
    "name": "Button",
    "description": "<p>Your standard form button.</p>",
    "state": [
      {
        "name": ":hover",
        "escaped": "pseudo-class-hover",
        "description": "Highlights when hovering."
      },
      {
        "name": ":disabled",
        "escaped": "pseudo-class-disabled",
        "description": "Dims the button when disabled."
      },
      {
        "name": ".primary",
        "escaped": "primary",
        "description": "Indicates button is the primary action."
      },
      {
        "name": ".smaller",
        "escaped": "smaller",
        "description": "A smaller button"
      }
    ],
    "example": {
      "line": "",
      "content": "<button>This is a button</button>"
    },
    "group": "buttons",
    "file": "/path/to/file.sass"
  }
]
```
