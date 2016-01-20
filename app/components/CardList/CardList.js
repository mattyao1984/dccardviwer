import React from 'react';
import logger from 'morgan';
import _ from 'lodash';
import CardsStore from '../../stores/cardsStores';
import CardsActions from '../../actions/cardsActions';
import Card from '../Card/Card';

class CardList extends React.Component {
  render() {
    var cards = [];

    this.props.data.forEach((card) => {
      cards.push(
        <li className="card-item" key={card._id}>
          <Card cardData={card} />
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
