import React from 'react';
import logger from 'morgan';
import $ from 'jquery';
import _ from 'lodash';
import CardsStore from '../../stores/cardsStores';
import CardsActions from '../../actions/cardsActions';

class Card extends React.Component {
  render() {
    var data = this.props.cardData;
    var imgPath = 'http://dccards.info/assets/images/cards/card/' + data.image;

    return(
      <a className="card-info-link">
        <img src={imgPath} />
      </a>
    );
  }
}

export default Card;
