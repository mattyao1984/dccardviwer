'use strict';

var Card = require('../../models/card');
var config = require('../../config');
var request = require('request');
var _ = require('lodash');

module.exports = {
  create: function(req, res){
    var card = new Card({
      name: req.body.name,
      description: req.body.description,
      catalog: req.body.catalog,
      cardNumber: req.body.cardNumber,
      strain: req.body.strain,
      rarity: req.body.rarity,
      spawnArea: req.body.spawnArea,
      image: req.body.name + '.png',
      stats: {
        healthMin: req.body.stats.healthMin,
        healthMax: req.body.stats.healthMax,
        psycheMin: req.body.stats.psycheMin,
        psycheMax: req.body.stats.psycheMax,
        attackMin: req.body.stats.attackMin,
        attackMax: req.body.stats.attackMax,
        defenseMin: req.body.stats.defenseMin,
        defenseMax: req.body.stats.defenseMax,
        speedMin: req.body.stats.speedMin,
        speedMax: req.body.stats.speedMax,
        intelligenceMin: req.body.stats.intelligenceMin,
        intelligenceMax: req.body.stats.intelligenceMax
      },
      skillset: {
        level01: req.body.skillset.level01,
        level15: req.body.skillset.level15,
        level30: req.body.skillset.level30,
        level40: req.body.skillset.level40,
        level50: req.body.skillset.level50,
        redeath: req.body.skillset.readeath
      }
    });

    card.save(function(err){
      if(err){
        res.json({
          status: 'error',
          error: err
        });
      }else{
        res.json({
          status: 'card created.',
          name: card.name
        });
      }
    });
  },

  index: function(req, res){
    Card.find({}, function(err, cards){
      if(err)
        res.send(err);

      res.json(cards);
    });
  },

  show: function(req, res, next){
    var cardId = req.params.id;

    Card.find(cardId, function(err, card){
      if(err)
        res.send(err);

      res.json(card);
    })
  },

  seedCards: function(req, res){
    //Save all cards info from public API to local MongoDB
    request('http://dccards.info/api/cards', function(error, response, body) {
      _.each(JSON.parse(body), function(card){
        var cardObj = new Card({
          name: card.name,
          description: card.description,
          catalog: card.catalog,
          cardNumber: card.cardNumber,
          strain: card.strain,
          rarity: card.rarity,
          spawnArea: card.spawnArea,
          image: card.name + '.png',
          stats: {
            healthMin: card.stats.healthMin,
            healthMax: card.stats.healthMax,
            psycheMin: card.stats.psycheMin,
            psycheMax: card.stats.psycheMax,
            attackMin: card.stats.attackMin,
            attackMax: card.stats.attackMax,
            defenseMin: card.stats.defenseMin,
            defenseMax: card.stats.defenseMax,
            speedMin: card.stats.speedMin,
            speedMax: card.stats.speedMax,
            intelligenceMin: card.stats.intelligenceMin,
            intelligenceMax: card.stats.intelligenceMax
          },
          skillset: {
            level01: card.skillset.level01,
            level15: card.skillset.level15,
            level30: card.skillset.level30,
            level40: card.skillset.level40,
            level50: card.skillset.level50,
            redeath: card.skillset.readeath
          }
        });

        cardObj.save(function(err){
          if(err){
            res.json({
              status: 'error',
              error: err
            });
          }else{
            console.log({
              status: 'card created.',
              name: card.name
            });
          }
        });
      });
    });
  }
};
