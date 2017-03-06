var marked = require('marked');

module.exports = function(){
  this.annotationRX = /^( ?)@/;

  this.getContent = function(i, line, block){
    // var nextAnnotation = block.indexOf(annotationRX, i+1);
    // var subBlock = block.substring(i, nextAnnotation);
    var subBlock = block.substring(i);
    var allButFirst = subBlock.split('\n').slice(1);

    var lines = [];
    for( var i = 0; i < allButFirst.length; i++){
      if( !allButFirst[i].match(this.annotationRX) ){
        lines.push(allButFirst[i]);
      }
      else {
        break;
      }
    }

    return {
      line: line.trim(),
      content: lines.join('\n').trim()
    };
  };

  this.getContentMarked = function(i, line, block){
    var result = this.getContent(i, line, block);
    result.content = marked(result.content).trim();
    return result;
  }

  this.getContentAndLine = function(i, line, block){
    var all = this.getContent(i, line, block);
    if( all.line && all.line.length > 0 ){
      return all.line + '\n' + all.content;
    }
    else {
      return all.content;
    }
  };

  this.getContentAndLineMarked = function(i, line, block){
    var result = this.getContentAndLine(i, line, block);
    return marked(result).trim();
  }

  this.getLine = function(i, line){
    return line.trim();
  };

  this.getLineMarked = function(i, line){
    return marked(line).trim();
  }

  this.parseLink = function(i, line){
    var parts = line.split(' ');
    for( var i = 0; i < parts.length; i++){
      if(part[i].length > 0){
        var link = part[i];
      }
    }
    var description = parts.splice( i + 1 ).join(' ');
    return {
      link: link.trim(),
      description: description.trim()
    };
  };

  this.parseSince = function(i, line){
    var link = this.parseLink(i, line);
    return {
      since: link.link,
      description: marked(link.description).trim()
    };
  }

  this.parseProp = function(i, line){
    // TODO Parse correctly.
    return line.trim();
  }

  this.parseParam = function(i, line){
    // TODO Parse correctly.
    return line.trim();
  };

  this.parseRequire = function(i, line){
    // TODO Parse correctly.
    return line.trim();
  }

  this.parseReturn = function(i, line){
    // TODO Parse correctly.
    return line.trim();
  }

  this.parseSee = function(i, line){
    // TODO Parse correctly.
    return line.trim();
  }

  this.detector = function(line){
    if(typeof line !== 'string')
      return false;
    var reference = line.split("\n\n").pop();
    return !!reference.match(this.annotationRX);
  };
}

// module.exports = {
//   detector: detector,
//   parseSee: parseSee,
//   parseReturn: parseReturn,
//   parseRequire: parseRequire,
//   parseParam: parseParam,
//   parseProp: parseProp,
//   parseSince: parseSince,
//   parseLink: parseLink,
//   getLineMarked: getLineMarked,
//   getLine: getLine,
//   getContentAndLineMarked: getContentAndLineMarked,
//   getContentAndLine: getContentAndLine,
// }
// module.exports = {
//   annotationRX: annotationRX,
//
//   detector: function(line){
//     if(typeof line !== 'string')
//       return false;
//     var reference = line.split("\n\n").pop();
//     return !!reference.match(annotationRX);
//   },
//
//   getContent: function(i, line, block){
//     // var nextAnnotation = block.indexOf(annotationRX, i+1);
//     // var subBlock = block.substring(i, nextAnnotation);
//     var subBlock = block.substring(i);
//     var allButFirst = subBlock.split('\n').slice(1);
//
//     var lines = [];
//     for( var i = 0; i < allButFirst.length; i++){
//       if( !allButFirst[i].match(annotationRX) ){
//         lines.push(allButFirst[i]);
//       }
//       else {
//         break;
//       }
//     }
//
//     return {
//       line: line,
//       content: lines.join('\n')
//     };
//   },
//
//   getContentMarked: function(i, line, block){
//     var result = getContent(i, line, block);
//     result.content = marked(result.content);
//     return result;
//   },
//
//   getContentAndLine: function(i, line, block){
//     var all = getContent(i, line, block);
//     return all.line + '\n' + all.content;
//   },
//
//   getContentAndLineMarked: function(i, line, block){
//     var result = getContentAndLine(i, line, block);
//     return marked(result);
//   },
//
//   getLine: function(i, line){
//     return line;
//   },
//
//   getLineMarked: function(i, line){
//     return marked(line);
//   },
//
//   parseLink: function(i, line){
//     var parts = line.split(' ');
//     for( var i = 0; i < parts.length; i++){
//       if(part[i].length > 0){
//         var link = part[i];
//       }
//     }
//     var description = parts.splice( i + 1 ).join(' ');
//     return {
//       link: link,
//       description: description
//     };
//   },
//
//   parseSince: function(i, line){
//     var link = parseLink(i, line);
//     return {
//       since: link.link,
//       description: marked(link.description)
//     };
//   },
//
//   parseProp: function(i, line){
//     // TODO Parse correctly.
//     return line;
//   },
//
//   parseParam: function(i, line){
//     // TODO Parse correctly.
//     return line;
//   },
//
//   parseRequire: function(i, line){
//     // TODO Parse correctly.
//     return line;
//   },
//
//   parseReturn: function(i, line){
//     // TODO Parse correctly.
//     return line;
//   },
//
//   parseSee: function(i, line){
//     // TODO Parse correctly.
//     return line;
//   }
// }
