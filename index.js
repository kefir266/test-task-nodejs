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
    const dateB = '2018-08-03 00:00:00';
    const dateE = '2018-08-07 23:59:59';
    const tt = 'test tt';
    return db.query(`
    SELECT 
      DATE_FORMAT(createdAt, '%d.%m.%Y') AS date,
      tt AS type_of_traffic,
      COUNT(type) AS count_of_installation
       
    FROM events
    WHERE type = 'install'
      AND createdAt > '${dateB}' ANd createdAt < '${dateE}'
      AND tt = '${tt}'
    GROUP BY DATE_FORMAT(createdAt, '%d.%m.%Y'), tt;
    `);
  })
  .then(result => {
    console.log(result);
    return db.query(`
    SELECT 
      createdAt,
      uid
       
    FROM events
    WHERE type = 'install';
    `);
  })
  .then(result => {
    console.log(result);
  })
  .catch(err => console.log(err));