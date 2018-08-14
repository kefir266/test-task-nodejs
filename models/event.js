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
  type: {
    type: String,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

class Event {
  static getNumberVisits(query) {
    const startDate = moment(query.date * 1000).startOf('day');
    const endDate = moment(query.date * 1000).endOf('day');
    return this.aggregate([
      {
        $match:
          {
            $and: [
              {created: {$gte: startDate.toDate()}},
              {created: {$lte: endDate.toDate()}},
              {type: {$ne: 'install'}}
            ]
          }
      },
      {
        $group: {
          '_id': {tt: "$tt", ts: "$ts"},
          'count': {$sum: 1}
        }
      }])
      .exec();
  }
}

schema.loadClass(Event);

module.exports = db.model('Event', schema);
