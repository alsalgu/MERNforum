const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// SERVES STATIC HOMEPAGE
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(8000, () => {
  console.log(`Server running on port 8000.\nKeep "yarn wds" running in an other terminal.`)
});
