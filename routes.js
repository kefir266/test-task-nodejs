'use strict';

const router = require('express').Router();
const bodyParser = require('body-parser');
const event = require('./controlers/event');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/event', event.save);
router.get('/event/number-visits', event.getNumberVisits);

module.exports = router;