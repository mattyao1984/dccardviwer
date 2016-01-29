'use strict';

var path = require('path');
var settings = {
  env: process.env.NODE_ENV,
  root: path.normalize(__dirname + '/..'),
  port: process.env.PORT || 3000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  /* Should we populate the DB with sample data? */
  seedDB: false,

  secrets: {
    session: 'none-secrect'
  },

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://mern-admin:a1b2c3d4e5@ds047075.mongolab.com:47075/heroku_cr7z2j0f',
    options: {
      db: {
        safe: true
      }
    }
  },

  facebook: {

  },

  google: {
    
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = settings;
