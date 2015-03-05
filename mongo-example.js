/* Install node-mongodb-native by doing:
 *  npm install mongodb
 * See documentation at https://github.com/christkv/node-mongodb-native#readme
 * Run this with:
 *  node mongo-example.js
 */
var mongodb = require("mongodb");

var server = new mongodb.Server("127.0.0.1", 27017, {});
// 27017 is the default port for connecting to MongoDB
var client = new mongodb.Db('shortlydb', server);

// Open the client's connection to the server:
client.open(function(err, p_client) {
  console.log("Connected to MongoDB!");
  console.error(err);

  // Create a collection, if it doesn't exist already:
  client.createCollection("", function(err, collection) {
    console.log("Created collection called URLS");

    var document = { username

    }

    // Insert it to the collection:
    collection.insert(document, function(err, docs) {
      console.log("Inserted a document.");

      // Count just gives us the number of items in collection:
      collection.count(function(err, count) {
        console.log("This collection contains " + count + " documents.");
      });

      // Find() returns a "cursor" which can be converted to an array of
      // documents:
      collection.find().toArray(function(err, results) {
        // Results is an array of all the documents in the collection
        for (var i = 0; i < results.length; i++) {
          console.log("Found a document with name = " + results[i].name);
        }

        // Close the db connection when we're done with it:
        client.close();
        console.log("Closed the collection");
      });
    });
  });
});


// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('base_url', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

