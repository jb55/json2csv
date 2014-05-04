
var expect = require('expect.js')
var from = require('from')
var through = require('through');
var getFields = require('../');

describe('fields', function(){
  describe('one', function(){
    it('have dot escaped', function(){
      var obj = { "expect.js": "1.0.0" } 
      var fields = getFields(obj);
      expect(fields).to.eql(["expect\\.js"])
    });
  });

  describe('stream', function(){
    it('has dots escaped', function(){
      from([{"expect.js": "1.0.0"}])
      .pipe(getFields.stream())
      .pipe(through(function(fields){
        expect([fields]).to.eql(["expect\\.js"])
      }))
    });
  });
});
