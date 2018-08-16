'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./routes');
const db = require('./db-mysql');
const sqlEvent = require('./models/sql-events');

app.use('/', routes);


app.listen(process.env.HTTP_PORT, function () {
  console.log(`App listening on port ${process.env.HTTP_PORT}`);
});

db.authenticate()
  .then( () => {
    console.log('Database MySQL has connected');
  })
  .catch(err => console.log(err));
