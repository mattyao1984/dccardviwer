import React from 'react';
import logger from 'morgan';
import $ from 'jquery';
import _ from 'lodash';
import CardsStore from '../../stores/cardsStores';
import CardsActions from '../../actions/cardsActions';

class CardList extends React.Component {
  render() {
    var cards = [];

    this.props.data.forEach((card) => {
      var imgPath = 'http://dccards.info/assets/images/cards/card/' + card.image;

      cards.push(
        <li className="card-item" key={card.cardNumber}>
          <a class="card-info-link">
            <img src={imgPath} />
          </a>
        </li>
      );
    });

    return(
      <ul className="card-list">
        {cards}
      </ul>
    );
  }
}

export default CardList;
