import React from 'react';
import Dispatcher from '../dispatcher/dispatcher';
import Constants from '../constants/constants';
import $ from 'jquery';

var CardActions = {
  loadCards: function(perpage, offset){
    Dispatcher.dispatch({
      actionType: Constants.LOADED_CARDS
    });

    var promise = $.ajax({
      url: '/api/cards',
      data: {
        limit: perpage,
        offset: offset
      },
      dataType: 'json',
      type: 'GET'
    });

    promise.then(function(res){
      Dispatcher.dispatch({
        actionType: Constants.LOADED_CARDS_SUCCESS,
        data: res
      })
    }, function(error){
      Dispatcher.dispatch({
        actionType: Constants.LOADED_CARDS_ERROR,
        error: error
      })
    })
  },

  loadStrains: function(perpage, offset){
    Dispatcher.dispatch({
      actionType: Constants.LOADED_STRAINS
    });

    var promise = $.ajax({
      url: '/api/strains',
      dataType: 'json',
      type: 'GET'
    });

    promise.then(function(res){
      Dispatcher.dispatch({
        actionType: Constants.LOADED_STRAINS_SUCCESS,
        data: res
      })
    }, function(error){
      Dispatcher.dispatch({
        actionType: Constants.LOADED_STRAINS_ERROR,
        error: error
      })
    })
  },

  loadRarities: function(perpage, offset){
    Dispatcher.dispatch({
      actionType: Constants.LOADED_RARITIES
    });

    var promise = $.ajax({
      url: '/api/rarities',
      dataType: 'json',
      type: 'GET'
    });

    promise.then(function(res){
      Dispatcher.dispatch({
        actionType: Constants.LOADED_RARITIES_SUCCESS,
        data: res
      })
    }, function(error){
      Dispatcher.dispatch({
        actionType: Constants.LOADED_RARITIES_ERROR,
        error: error
      })
    })
  },

  loadSpawnAreas: function(perpage, offset){
    Dispatcher.dispatch({
      actionType: Constants.LOADED_SPAWN_AREAS
    });

    var promise = $.ajax({
      url: '/api/spawnAreas',
      dataType: 'json',
      type: 'GET'
    });

    promise.then(function(res){
      Dispatcher.dispatch({
        actionType: Constants.LOADED_SPAWN_AREAS_SUCCESS,
        data: res
      })
    }, function(error){
      Dispatcher.dispatch({
        actionType: Constants.LOADED_SPAWN_AREAS_ERROR,
        error: error
      })
    })
  }
};

export default CardActions;
