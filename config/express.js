'use strict';

/**
 * Express configuration
 */
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var path = require('path');
var config = require('./index');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var engines = require('consolidate');

module.exports = function(app){
  app.set('views', __dirname + '/views');
  app.engine('html', engines.mustache);
  app.set('view engine', 'html');

  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '../public')));

  app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      db: 'mern-dc'
    })
  }));
};
