'use strict';

var path = require('path');

var settings = {
  env: process.env.NODE_ENV,
  root: path.normalize(__dirname + '/..'),
  port: process.env.PORT || 3002,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  /* Should we populate the DB with sample data? */
  seedDB: false,

  secrets: {
    session: 'none-secrect'
  },

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost:27017/mern-dc',
    options: {
      db: {
        safe: true
      }
    }
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = settings;
