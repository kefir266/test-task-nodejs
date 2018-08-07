'use strict';

const Sequelize = require('sequelize');

const sequelize = new Sequelize('leantegra', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false});

module.exports = sequelize;