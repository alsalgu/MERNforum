const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const secrets = require('./secrets.js');
const mongoose = require('mongoose');
const Cat = require('../models/cat.js')

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Allows the use of files.
app.use(express.static(__dirname + './../../'));

// SERVES STATIC HOMEPAGE
// Changed path-route for compatibility with
// React-Router-Dom pkg
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.route('/Register').get(function(req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
}).post(function(req, res, next) {
  Cat.create(req.body)
})

app.route('/:id').get(function(req, res, next) {
  Cat.findOne({
    _id: req.params.id
  }, function(err, user) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
}).delete(function(req, res) {
  Cat.findByIdAndRemove({
    _id: req.params.id
  }, function(err, Cat) {
    if (err)
      res.send(err);

    res.json({message: 'Successfully deleted'});
  });
});

app.route('/api/cat').get(function(req, res) {
  Cat.find(function(err, products) {
    if (err)
      return next(err);
    res.json(products);
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
