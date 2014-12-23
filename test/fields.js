
var expect = require('expect.js')
var from = require('from')
var through = require('through');
var keys = require('../').keys;
var fields = require('../').fields;

describe('fields', function(){
  describe('one', function(){
    it('have dot escaped', function(){
      var obj = { "expect.js": "1.0.0" } 
      var fields = keys(obj);
      expect(fields).to.eql(["expect\\.js"])
    });
  });

  describe('stream', function(){
    it('has dots escaped', function(){
      from([{"expect.js": "1.0.0"}])
      .pipe(fields())
      .pipe(through(function(fields){
        expect([fields]).to.eql(["expect\\.js"])
      }))
    });
  });

});
