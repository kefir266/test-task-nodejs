'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const ObjectIdSchema = Schema.Types.ObjectId;
const db = require('../db-mongo');
const moment = require('moment');


const schema = new Schema({
  _id: {
    type: ObjectIdSchema,
    default: () => {
      return new ObjectId();
    },
    set: value => {
      return ObjectId(value);
    }
  },
  uid: {
    type: String,
    trim: true
  },
  ts: {
    type: String,
    trim: true
  },
  tt: {
    type: String,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now }
});

class Event {
  static getNumberVisits(query){
    const startDate = moment(query.date).startOf('day');
    const endDate = moment(query.date).endOf('day');
    const request = { uid: query.uid, tt: query.tt, created: { $gte: startDate, $lt: endDate }};
    return this.aggregate.group(request)
      .sort({ created: 1 })
      .exec();
  }
}

schema.loadClass(Event);

module.exports = db.model('Event', schema);