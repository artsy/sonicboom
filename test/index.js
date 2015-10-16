require('should');
var mod = require('../');
var request = require('superagent');

describe('Sonic Boom', function() {
  var server;

  beforeEach(function(done) {
    mod.callback = function() {
      server = mod.server;
      done();
    };
  });

  afterEach(function() {
    server.close();
  });

  it('returns a random artwork', function(done) {
    request
      .get('http://localhost:3000')
      .end(function(err, sres){
        sres.redirects[0].should.containEql('https://d32dm0rphc51dk.cloudfront.net/');
        done();
      });
  });
});
