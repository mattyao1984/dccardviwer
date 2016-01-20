import React from 'react';
import logger from 'morgan';
import _ from 'lodash';
import CardsStore from '../../stores/cardsStores';
import CardsActions from '../../actions/cardsActions';

class CardModal extends React.Component {
  render() {
    return(
      <div className="zoom-anim-dialog mfp-hide" id="card-modal">

      </div>
    );
  }
};

export default CardModal;
