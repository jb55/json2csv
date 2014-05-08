
var expect = require('expect.js')
var from = require('from');
var json2csv = require('../');
var reduce = require('stream-reduce');
var through = require('through');

function toarray() {
 return reduce(function(items, item){
    items.push(item)
    return items;
 }, [])
}

describe('json2csv', function(){
  it('with fields works', function(done){
    var objs = [
      { a: 'hello', b: 'hi' },
      { a: 'hello2', b: 'hi2', c: 'derp' },
    ]

    from(objs)
    .pipe(json2csv(["a"]))
    .pipe(toarray())
    .pipe(through(function(items){
      expect(items[0]).to.eql(["a"]);
      expect(items[1]).to.eql(["hello"]);
      expect(items[2]).to.eql(["hello2"]);
      done();
    }))
  });
  
  it('without fields works', function(done){
    var objs = [
      { a: 'hello', b: 'hi' },
      { a: 'hello2', b: [1], c: 'derp' },
    ]

    from(objs)
    .pipe(json2csv())
    .pipe(toarray())
    .pipe(through(function(items){
      expect(items[0]).to.eql(["a", "b", "b.0", "c"]);
      expect(items[1]).to.eql(["hello", "hi", "h", ""]);
      expect(items[2]).to.eql(["hello2", [1], "1", "derp"]);
      done();
    }))
  });
});
