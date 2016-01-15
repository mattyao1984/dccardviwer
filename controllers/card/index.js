'use strict';

var express = require('express');
var CardCtrl = require('./card.controller');
var router = express.Router();

router.get('/api/cards', CardCtrl.index);
router.get('/api/cards/:id', CardCtrl.show);
router.post('/api/card', CardCtrl.create);
router.get('/api/seedCards', CardCtrl.seedCards);

module.exports = router;
