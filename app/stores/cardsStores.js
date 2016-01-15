import React from 'react';
import Dispatcher from '../dispatcher/dispatcher';
import Constants from '../constants/constants';
import events from 'events';
import $ from 'jquery';
import _ from 'lodash';
import assign from 'object-assign';

var EventEmitter = events.EventEmitter;
var allCards = [];
var request_error = '';
var CHANGE_EVENT = 'change';

var CardsStore = assign({}, EventEmitter.prototype, {
  getAllCards: function(){
    return allCards;
  },

  getRequestError: function(){
    return request_error;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

Dispatcher.register((payload) => {
  switch(payload.actionType){
    case Constants.LOADED_CARDS:
      CardsStore.emitChange();
      break;
    case Constants.LOADED_CARDS_SUCCESS:
      allCards = payload.data;
      CardsStore.emitChange();
      break;
    case Constants.LOADED_CARDS_ERROR:
      request_error = payload.error;
      CardsStore.emitChange();
      break;
  }
});

export default CardsStore;
