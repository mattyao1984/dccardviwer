import React from 'react';
import Dispatcher from '../dispatcher/dispatcher';
import Constants from '../constants/constants';
import events from 'events';
import _ from 'lodash';
import assign from 'object-assign';

var EventEmitter = events.EventEmitter;
var allCards = [];
var allRarities = [];
var allSpawnAreas = [];
var allStrains = [];
var pageNum = 0;
var request_error = '';
var CHANGE_EVENT = 'change';
var filterOptions = {
  rarity: 'All',
  strain: 'All',
  spawnArea: 'All'
}
var selectedCard = {};

var CardsStore = assign({}, EventEmitter.prototype, {
  getAllCards: function(){
    return allCards;
  },

  getPageNum: function(){
    return pageNum;
  },

  getRarities: function(){
    return allRarities;
  },

  getSpawnAreas: function(){
    return allSpawnAreas;
  },

  getStrains: function(){
    return allStrains;
  },

  getFilterOptions: function(){
    return filterOptions;
  },

  getRequestError: function(){
    return request_error;
  },

  getSelectedCard: function(){
    return selectedCard;
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
    case Constants.LOADED_STRAINS:
    case Constants.LOADED_RARITIES:
    case Constants.LOADED_SPAWN_AREAS:
      CardsStore.emitChange();
      break;
    case Constants.LOADED_CARDS_SUCCESS:
      allCards = payload.data.cards;
      pageNum = Math.ceil(payload.data.meta.total_count / payload.data.meta.limit);
      CardsStore.emitChange();
      break;
    case Constants.LOADED_STRAINS_SUCCESS:
      allStrains = payload.data;
      CardsStore.emitChange();
      break;
    case Constants.LOADED_RARITIES_SUCCESS:
      allRarities = payload.data;
      CardsStore.emitChange();
      break;
    case Constants.LOADED_SPAWN_AREAS_SUCCESS:
      allSpawnAreas = payload.data;
      CardsStore.emitChange();
      break;
    case Constants.LOADED_CARDS_ERROR:
    case Constants.LOADED_RARITIES_ERROR:
    case Constants.LOADED_SPAWN_AREAS_ERROR:
    case Constants.LOADED_STRAINS_SUCCESS:
      request_error = payload.error;
      CardsStore.emitChange();
      break;
    case Constants.UPDATE_FILTER:
      filterOptions = payload.data;
      CardsStore.emitChange();
      break;
    case Constants.SELECT_CARD:
      selectedCard = _.find(allCards, function(card){
        return card._id == payload.cardId;
      });
      CardsStore.emitChange();
      break;
  }
});

export default CardsStore;
