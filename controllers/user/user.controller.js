var User = require('../../models/user');
var config = require('../../config');
var request = require('request');
var _ = require('lodash');
var util = require('util');
var passport = require('passport');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

module.exports = {
  create: function(req, res){
    var user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      ign: req.body.ign
    });

    user.save(function(err){
      if(err){
        res.json({
          status: 'error',
          error: err
        });
      }

      var token = jwt.sign({_id: user._id}, config.secrets.session, {expiresInMinutes: 60*5});

      res.json({
        status: 'success',
        user_id: user._id,
        token: token
      });
    });
  },

  exports.me = function(req, res, next){
    var userId = req.user._id;

    User.findOne({
      _id: userId
    }, function(err, user){
      if(err)
        return next(err);

      if(!user)
        return res.json({
          status: 'Unauthorized',
          error: err
        });

      res.json(user);
    });
  },

  exports.authCallback = function(req, res, next){
    res.redirect('/');
  }
};
