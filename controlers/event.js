'use strict';
const Event = require('../models/event');
const SqlEvent = require('../models/sql-events');

module.exports = {
  save,
  getNumberVisits,
  getMostActiveUsers,
  getNumbersOfInstallations
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
      .then(result => res.json({ result: result }))
      .catch(err => res.status(400).send(err));
  } else {
    res.status(401).send('Bad request');
  }
}

function getMostActiveUsers(req, res) {
  Event.getMostActiveUsers(req.query)
    .then(result => res.json({ result: result }))
    .catch(err => res.status(400).send(err));
}

function getNumbersOfInstallations(req, res) {
  SqlEvent.getNumbersOfInstallations(req.query)
    .then(result => res.json({ result: result }))
    .catch(err => res.status(400).send(err));
}

function isEventValid(query) {

  return query.type && query.uid && query.ts && query.tt &&
    query.type.match(/[install|login|end]/i) &&
    query.uid.match(/[A-z]+/i) &&
    query.ts.match(/[a-z_]+/i) &&
    query.tt.match(/[a-z_]+/i);
}
