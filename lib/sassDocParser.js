var Parser = require('./annotationParsers');
var dss = require('dss');

module.exports = function(options){
  options = options || {};
  var customParsers = options.parsers || [];
  var parsers = new Parser();

  var customParsers = customParsers.concat([{
      name: 'access',
      callback: parsers.getLine.bind(parsers)
    },{
      name: 'alias',
      callback: parsers.getLine.bind(parsers)
    },{
      name: 'author',
      callback: parsers.getLineMarked.bind(parsers)
    },{
      name: 'content',
      callback: parsers.getContentAndLineMarked.bind(parsers)
    },{
      name: 'deprecated',
      callback: parsers.getContentAndLineMarked.bind(parsers)
    },{
      name: 'description',
      callback: parsers.getContentAndLineMarked.bind(parsers)
    },{
      name: 'example',
      callback: parsers.getContent.bind(parsers)
    },{
      name: 'group',
      callback: parsers.getLine.bind(parsers)
    },{
      name: 'ignore',
      callback: parsers.getLine.bind(parsers)
    },{
      name: 'index',
      callback: parsers.getLine.bind(parsers)
    },{
      name: 'link',
      callback: parsers.parseLink.bind(parsers)
    },{
      name: 'output',
      callback: parsers.getContentAndLineMarked.bind(parsers)
    },{
      name: 'param',
      callback: parsers.parseParam.bind(parsers)
    },{
      name: 'prop',
      callback: parsers.parseProp.bind(parsers)
    },{
      name: 'require',
      callback: parsers.parseRequire.bind(parsers)
    },{
      name: 'return',
      callback: parsers.parseReturn.bind(parsers)
    },{
      name: 'see',
      callback: parsers.parseSee.bind(parsers)
    },{
      name: 'since',
      callback: parsers.parseSince.bind(parsers)
    },{
      name: 'throw',
      callback: parsers.getContentAndLineMarked.bind(parsers)
    },{
      name: 'todo',
      callback: parsers.getContentAndLineMarked.bind(parsers)
    },{
      name: 'type',
      callback: parsers.getContentAndLineMarked.bind(parsers)
    }
  ]);

  // Register detector
  if( options.detector ){
    dss.detector(options.detector);
  }
  else {
    dss.detector(parsers.detector);
  }

  // Register parsers
  customParsers.forEach(function (parser) {
    dss.parser(parser.name, parser.callback);
  });

  this.parse = function(fileContents, callback){
    var output = [];

    dss.parse(fileContents, {}, function(parsed){
      if( parsed && parsed.blocks && parsed.blocks.length > 0 ) {
        parsed.blocks.forEach(function(block){
          if( block.name ) {
            output.push(block);
          }
        });
      }

      callback(output);
    });
  }
}
