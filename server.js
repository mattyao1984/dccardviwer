'use strict';

/**
 * Main application file
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var config = require('./config');
var Router = require('./routes');

var app = express();

//Connect to DB
mongoose.connect(config.mongo.uri[process.env.NODE_ENV], config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
});

require('./config/express')(app);
require('./routes')(app);

var server = require('http').createServer(app);
server.listen(config.port, function() {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});
