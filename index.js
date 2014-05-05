
var table = require('tableize-array');
var through = require('through');

var exports = module.exports = function(obj) {
  return one(obj);
}

exports.fields = function() {
  var d = {};
  return through(write, end);

  function write(item) {
    for (var key in table(item)) {
      d[key] = 1;
    }
  }

  function end() {
    var self = this;
    Object.keys(d).forEach(function(key){
      self.push(key);
    });
    this.push(null)
  }
}

function one(obj) {
  return Object.keys(table(obj))
}
