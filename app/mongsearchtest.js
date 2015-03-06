var mongoose = require('mongoose');
var Models = require('./config.js');

var db = mongoose.createConnection('mongodb://localhost:27017');


db.once('open', function() {
  console.log('opened!')


  Models.User.find(function(err, users) {
    if (err) return console.error(err);
    console.dir(users);
  });


});


