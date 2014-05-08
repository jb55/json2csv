
# json2csv [![Build Status](https://travis-ci.org/jb55/json2csv.svg)](https://travis-ci.org/jb55/json2csv)

  Convert a stream of json objects to csv

  Will guess field names from the first object, or you can specify them manually.

  Field names are [dot-lenses](https://github.com/jb55/dot-lens) generated by
  [tableize-array](https://github.com/jb55/tableize-array)

## Installation

  Install with npm

    $ npm install jb55/json2csv

## Examples

### json2csv

    $ json2csv package.json

```
"name","description","keywords.0","keywords.1","keywords.2","version","repository.type","repository.url","main","scripts.test","bin.json-table","bin.json-fields","dependencies.JSONStream","dependencies.csv","dependencies.debug","dependencies.dot-lens","dependencies.epipebomb","dependencies.join-stream","dependencies.minimist","dependencies.tableize-array","dependencies.through","devDependencies.expect\.js","devDependencies.from","devDependencies.mocha"
"json-table","tableize json","csv","table","json2csv","0.0.1","git","git://github.com/jb55/json-table.git","index.js","mocha --harmony --reporter spec","./bin/json2csv","./bin/json-fields","^0.7.3","git://github.com/segmentio/csv","^0.8.1","1.1.1","^0.1.1","0.0.0","0.0.8","^1.1.0","^2.3.4","*","^0.1.3","*"
```

### csv2json

    $ json2csv package.json | csv2json
    $ # convert to and from csv!

### Making sure all fields are covered

json2csv will buffer all objects to make sure no fields are missed before
spitting out the csv. If you know what fields you want you can avoid buffering
everything by passing in an `-f` option:

    $ mongoexport -c users > users.json 
    $ <users.json json2csv -f fielda,fieldb

### json-fields

This utility simply spits out all of the fields from a stream of JSON objects

## License

  The MIT License (MIT)

  Copyright (c) 2014 William Casarin

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
