var kabuto = require('../');
var fs = require('fs');
var assert = require('assert');

describe('compile', function(){
  it('正しくtssが生成されること', function(){
    var yaml = fs.readFileSync('./test/before.yml', 'utf-8');
    var tss = fs.readFileSync('./test/after.tss', 'utf-8');
    assert(kabuto.compile(yaml), tss);
  });
});
