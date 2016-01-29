'use strict';

var express = require('express');
var UserCtrl = require('./user.controller');
var router = express.Router();

router.post('/api/user', UserCtrl.create);
router.get('/api/users/me', UserCtrl.me);

module.exports = router;
