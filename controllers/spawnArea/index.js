'use strict';

var express = require('express');
var SpawnAreaCtrl = require('./spwanArea.controller');
var router = express.Router();

router.get('/api/spawnAreas', SpawnAreaCtrl.index);
router.get('/api/spawnAreas/:id', SpawnAreaCtrl.show);
router.post('/api/spawnArea', SpawnAreaCtrl.create);
router.get('/api/seedSpawnAreas', SpawnAreaCtrl.seedSpawnAreas);

module.exports = router;
