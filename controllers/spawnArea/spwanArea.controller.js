'use strict';

var mongoose = require('mongoose');
var SpawnArea = require('../../models/spawnArea');
var config = require('../../config');
var _ = require('lodash');

module.exports = {
  create: function(req, res){
    var spawnArea = new SpawnArea({
      name: req.body.name,
    });

    spawnArea.save(function(err){
      if(err){
        res.json({
          status: 'error',
          error: err
        });
      }else{
        res.json({
          status: 'spawnArea created.',
          name: spawnArea.name
        });
      }
    });
  },

  index: function(req, res){
    SpawnArea.find({}, function(err, spawnAreas){
      if(err)
        res.send(err);

      res.json(spawnAreas);
    });
  },

  show: function(req, res, next){
    var spawnAreaId = req.params.id;

    SpawnArea.find({_id: spawnAreaId}, function(err, spawnArea){
      if(err)
        res.send(err);

      res.json(spawnArea);
    })
  },

  seedSpawnAreas: function(req, res){
    var currentAreas = [
      'Gould Square',
      'Gould Square (alt)',
      'Clayton Cemetary',
      'ZenoTek Stadium',
      'Tumbleweed Casino',
      'Morris Penitentiary',
      'Raccoon City',
      'USS Claypool',
      'Boneyard',
      'Login Bonus'
    ];

    //Truncate the collection first
    SpawnArea.remove({}, function(err){
      console.log('Spawn area collection is dropped.', err);
    });

    //Save all spawn areas to local MongoDB
    _.each(currentAreas, function(area){
      var spawnAreaObj = new SpawnArea({
        name: area,
      });

      spawnAreaObj.save(function(err){
        if(err){
          res.json({
            status: 'error',
            error: err
          });
        }else{
          console.log({
            status: 'New spawn area is created.',
            name: area
          });
        }
      });
    });
  }
};
