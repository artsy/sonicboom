var express = require('express');
var request = require('superagent');
var artsyXapp = require('artsy-xapp');
var app = express();

app.get('/', function(req, res, next){
  request
    .get(process.env.ARTSY_URL + '/api/artworks')
    .query({ sample: 1, published: true })
    .set('X-Xapp-Token', artsyXapp.token)
    .end(function(err, sres){
      // Calling the end function will send the request
      if (err) return next(err)
      res.redirect(sres.body._links.thumbnail.href.replace('medium.jpg', 'large.jpg'))
    });
});

artsyXapp.init(function() {
  module.exports.server = app.listen(process.env.PORT, module.exports.callback);
});
artsyXapp.on('error', process.exit);
