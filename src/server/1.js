const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const secrets = require('./secrets.js');
const mongoose = require('mongoose');
const Article = require('../models/Articles.js')

const app = express();
const appPage = path.join(__dirname, '../client/index.html')

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.disable('etag');
// Allows the use of files.
app.use(express.static(__dirname + './../../'));

// SERVES STATIC HOMEPAGE
// Changed path-route for compatibility with
// React-Router-Dom pkg
app.get('/', function(req, res) {
  res.sendFile(appPage);
});

// Master Article Page and where once can post
app.route('/Articles').get(function(req, res) {
  res.sendFile(appPage);
}).post(function(req, res, next) {
  Article.create(req.body)
  res.end("Article Created")
})

// Routes to individual Articles using the ID parameter
app.route('/Articles/:id').get(function(req, res, next) {
  res.sendFile(appPage)
}).delete(function(req, res) {
  Article.findByIdAndRemove({
    _id: req.params.id
  }, function(err, art) {
    res.end();
  })
})

app.route('/Articles/:id/edit').get(function(req, res, next) {
  res.sendFile(appPage)
}).put(function(req, res) {
  Article.findByIdAndUpdate(req.params.id, req.body, function(err, arr) {
    res.end();
  });
})

// Article API
app.get('/api/Articles', function(req, res) {
  Article.find(function(err, arr) {
    if (err)
      return next(err);
    res.json(arr);
  });
})

// Anyhing that's not a defined route will just lead to home for now
app.use(function(req, res, next) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Mongoose - MongoDB connector
const mongoDB = secrets.dbURL;
// Set up default Mongoose Connection
mongoose.connect(mongoDB).then(console.log("Establishing connection..."));
// Get Mongoose to use global promise LIbrary
mongoose.Promise = global.Promise;
// Get default connection
const db = mongoose.connection;
// Connection and Error Handlers
db.on('open', function(ref) {
  console.log('Open connection to Mongo Server...');
});
db.on('connected', function(ref) {
  console.log('Connected to Mongo Server.');
})
db.on('reconnect', function(ref) {
  console.log('Reconnected to Mongo Server');
})
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(8000, () => {
  console.log(`Server running on port 8000.\nKeep "yarn wds" running in an other terminal.`)
});
