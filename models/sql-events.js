'use strict';

const db = require('../db-mysql');
const Sequelize = require('sequelize');
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

module.exports = Event;