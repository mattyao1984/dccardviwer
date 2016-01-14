import React from 'react';
import {Route} from 'react-router';
import App from './app';
import Home from './components/Home/Home';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
  </Route>
);
