
var table = require('tableize-array');
var debug = require('debug')('json2csv');
var debugMiss = require('debug')('json2csv:missing');
var through = require('through');
var getlens = require('dot-lens').get;

function lensVal(lens, obj, field) {
  try {
    var val = lens(obj);
    if (val == null) return "";
    return val;
  }
  catch (e) {
    debugMiss("missing field '%s' in %j", field, obj);
    return "";
  }
}

function withFields(fields) {
  debug("using withFields");
  var first = true;
  var d = {};
  var items = [];
  var lenses = fields.map(getlens);

  return through(write);

  function write(obj) {
    if (first === true) {
      first = false;
      this.push(fields);
    }
    this.push(lenses.map(function(lens){
      return lensVal(lens, obj);
    }));
  }
}


function withoutFields() {
  debug("using withoutFields");
  var fields = {};
  var items = [];
  return through(write, end);

  function write(item) {
    exports.keys(item).forEach(function(key){
      fields[key] = 1;
    });
    items.push(item);
  }

  function end() {
    var self = this;
    fields = Object.keys(fields)
    debug("withoutFields fields: %j", fields)
    var lenses = fields.map(getlens)
    this.push(fields);
    items.forEach(function(item){
      self.push(lenses.map(function(lens, i){
        return lensVal(lens, item, fields[i]);
      }));
    });
    this.push(null)
  }
}

var exports = module.exports = function(fields) {
  if (fields == null || fields.length === 0)
    return withoutFields();
  else
    return withFields(fields);
}

exports.keys = function(obj) {
  return Object.keys(table(obj))
}


exports.fields = function() {
  var fields = {};
  return through(write, end);

  function write(item) {
    var t = table(item);
    for (var key in t) fields[key] = 1;
  }

  function end() {
    var self = this;
    Object.keys(fields).forEach(function(field){
      self.push(field);
    });
    this.push(null)
  }
}
