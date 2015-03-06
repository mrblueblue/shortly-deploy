var mongoose = require('mongoose');
var Models = require('./config.js');

var db = mongoose.createConnection('mongodb://localhost:27017');


db.once('open', function() {
  console.log('opened!')

  var url = new Models.Url({
    url: 'www.google.com',
    base_url: 'express-shortly.com',
    code: '234987',
    title: 'Google',
  });

  url.save(function(err, url) {
    if (err) return console.error(err);
    console.dir(url, 'is saved');
  });


});
