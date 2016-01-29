'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../../config');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var User = require('../../models/user');
var validateJwt = expressJwt({secret: config.secrets.session});

exports.module = {
  isAuthenticated: function(){
    return compose()
           .use(function(req, res, next){
             if(req.query && req.query.hasOwnProperty('access_token')){
               req.headers.authorization = 'Bearer ' + req.query.access_token;
             }

             validateJwt(req, res, next);
           })
           .use(function(req, res, next){
             
           });
  },

  hasRole: function(roleRequired){
    if(!roleRequired)
      throw new Error('Required role needs to be set');

    return compose()
          .use(isAuthenticated())
          .use(function meetsRequirements(req, res, next){
            if(config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)){
              next();
            }else{
              res.status(403).send('Forbidden');
            }
          });
  },

  signToken: function(id, role){
    return jwt.sign({_id: id}, config.secrets.session, {expireInMinutes: 60*5});
  },

  setTokenCookie: function(req, res){
    if(!req.user)
      return res.status(404).json({
        status: 'Error',
        message: 'Something went wrong, please try again'
      });

    var token = signToken(req.user._id, req.user.role);
    res.cookie('token', JSON.stringify(token));
    res.redirect('/');
  }
};
