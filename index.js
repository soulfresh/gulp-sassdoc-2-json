'use strict'

var File = require('vinyl');
var gutil = require('gulp-util');
var through = require('through2');
var dss = require('dss');
var SassDocParser = require('./lib/sassDocParser');

module.exports = function(fileName, options) {
  // If a string wasn't passed as the fileName.
  if( typeof( fileName ) != 'string' ){
    var title = 'gulp-dss';
    var message = 'Expected an output filename but got ' + fileName;
    gutil.log(gutil.colors.red(`${title}: ${message}`));
    return new gutil.PluginError(title, message);
  }

  var files = [];
  var styleguide = [];
  var parser = new SassDocParser(options);

  // Process files
  function process (file, encoding, callback) {

    if (file.isNull()) {
      callback(null, file)
      return
    }

    if (file.isStream()) {
      callback(new gutil.PluginError('gulp-dss', 'Streaming not supported'))
      return
    }

    parser.parse(file.contents.toString(), function(blocks){
      blocks.forEach(function(block){
        // Add filename
        // TODO Make this relative.
        block.file = file.path
        styleguide.push(block);
      })

      callback();
    });
  }

  function end (callback) {
    var content = JSON.stringify( styleguide, null, 2 );
    var temp = new File({ path: fileName, contents: new Buffer(content) });
    this.push(temp);
    callback();
  }

  return through.obj(process, end);
}

