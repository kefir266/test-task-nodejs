'use strict';

const router = require('express').Router();
const bodyParser = require('body-parser');
const event = require('./controlers/event');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/event', event.save);
router.get('/event/number-visits', event.getNumberVisits);
router.get('/event/most-active-users', event.getMostActiveUsers);
router.get('/event/number-of-installations', event.getNumbersOfInstallations);

module.exports = router;
