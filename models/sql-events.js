'use strict';

const db = require('../db-mysql');
const Sequelize = require('sequelize');
const moment = require('moment');

const Event = db.define('event', {
  application: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  uid: {
    type: Sequelize.STRING
  },
  ts: {
    type: Sequelize.STRING
  },
  tt: {
    type: Sequelize.STRING
  }

});

// force: true will drop the table if it already exists
Event.sync({force: false}).then(() => {
  // Table created
  return Promise.all(
    [
      Event.create({
        application: 'test',
        type: 'install',
        uid: 'test uid',
        ts: 'test ts',
        tt: 'test tt'
      }),
      Event.create({
        application: 'test2',
        type: 'login',
        uid: 'test uid2',
        ts: 'test ts2',
        tt: 'test tt2'
      }),
      Event.create({
        application: 'test2',
        type: 'install',
        uid: 'test uid3',
        ts: 'test ts2',
        tt: 'test tt2'
      })
    ]);
});

Event.getNumbersOfInstallations = function(query){
  const dateB = moment(query.date_b * 1000);
  const dateE = moment(query.date_e * 1000);
  const tt = 'test tt';
  return db.query(`
    SELECT 
      DATE_FORMAT(created, '%d.%m.%Y') AS date,
      tt AS type_of_traffic,
      COUNT(type) AS count_of_installation
       
    FROM events
    WHERE type = 'install'
      AND created > '${dateB}' ANd created < '${dateE}'
      AND tt = '${tt}'
    GROUP BY DATE_FORMAT(created, '%d.%m.%Y'), tt;
    `);
};

module.exports = Event;
