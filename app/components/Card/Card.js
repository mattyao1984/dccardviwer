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
        <div className="flipper">
          <div className="flipper-front">
            <img src={imgPath} />
          </div>

          <div className="flipper-back">
            <p className="text-left">{data.description}</p>
          </div>
        </div>
      </a>
    );
  }
}

export default Card;
