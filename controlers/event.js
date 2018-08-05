'use strict';
const Event = require('../models/event');
module.exports = {
  save,
  getNumberVisits
};

function save(req, res) {
  if (req.query && isEventValid(req.query)) {

    const event = new Event(req.query);
    event.save()
      .then(result => res.json({ result }))
      .catch(err => res.status(400).send(err));
  } else {
    res.status(401).send('Bad request');
  }

}
function getNumberVisits(req, res) {
  if (req.query.uid && req.query.date && req.query.tt) {
    Event.getNumberVisits(req.query)
      .then(result => res.json({ result: result.length }))
      .catch(err => res.status(400).send(err));
  } else {
    res.status(401).send('Bad request');
  }
}
function isEventValid(query) {

  return query.type && query.uid && query.ts && query.tt &&
    query.type.match(/[install|login|end]/i) &&
    query.uid.match(/[A-z]+/i) &&
    query.ts.match(/[a-z_]+/i) &&
    query.tt.match(/[a-z_]+/i);
}