// Dependencies
const express = require('express');
const Promise = require('bluebird');
const app = require('express')();
const https = require('https');
const BodyParser = require('body-parser');
const Path = require('path');
const fs = require('fs');
const Routes = require('./server/config/routes.js');

// SSL Certs
const options = process.env.NODE_ENV === 'production'
  ? {
      cert: fs.readFileSync(
        Path.join(__dirname, '../', 'encryption/fullchain.pem')
      ),
      key: fs.readFileSync(
        Path.join(__dirname, '../', '/encryption/privkey.pem')
      ),
      ca: fs.readFileSync(Path.join(__dirname, '../', 'encryption/chain.pem'))
    }
  : {};

// Add Body Parser
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

// Add static content directory (img, css, js, etc)
app.use(express.static(Path.join(__dirname, 'client', 'public')));

// Routes
app.use('/', Routes);

// Server listen
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on ${process.env.PORT || 3000}`);
});

https.createServer(options, app).listen(8443);

module.exports = app;
