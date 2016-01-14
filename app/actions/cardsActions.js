import Dispatcher from '../dispatcher/dispatcher';
import Constants from '../constants/constants';
import $ from 'jquery';

var CardActions = {
  loadCards: function(){
    Dispatcher.dispatch({
      actionType: Constants.LOADED_CARDS
    });

    var promise = $.ajax({
      url: '/api/cards'
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
  }
};

export default CardActions;
