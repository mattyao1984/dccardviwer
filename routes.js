'use strict';

// Babel ES6/JSX Compiler
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var Router = require('react-router');
var routes = require('./app/routes');
var swig  = require('swig');
var config = require('./config');
var React = require('react');
var ReactDOM = require('react-dom/server');

module.exports = function(app){
  app.use(require('./controllers/card'));

  app.use(function(req, res){
    Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
      if (err) {
        res.status(500).send(err.message);
      } else if (redirectLocation) {
        res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
          var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
          var page = swig.renderFile('views/index.html', { html: html });
          res.status(200).send(page);
      } else {
        res.status(404).send('Page Not Found');
      }
    });
  });
};
