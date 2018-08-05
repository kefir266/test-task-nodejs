'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./routes');

app.use('/', routes);


app.listen(process.env.HTTP_PORT, function () {
  console.log(`App listening on port ${process.env.HTTP_PORT}`);
});