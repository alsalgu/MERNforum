const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Allows the use of files.
app.use(express.static(__dirname + './../../'))

// SERVES STATIC HOMEPAGE
// Changed path-route to a catch-all for compatibility with
// React-Router-Dom pkg
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(8000, () => {
  console.log(`Server running on port 8000.\nKeep "yarn wds" running in an other terminal.`)
});
