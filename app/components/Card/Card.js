import React from 'react';
import logger from 'morgan';
import _ from 'lodash';
import CardsStore from '../../stores/cardsStores';
import CardsActions from '../../actions/cardsActions';

class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedCard: {}
    };

    this.render = this.render.bind(this);
    this._viewCard = this._viewCard.bind(this);
  }

  componentDidMount() {
    $('.card-info-link').magnificPopup({
      type: 'inline',
  		fixedContentPos: false,
  		fixedBgPos: true,
  		overflowY: 'auto',
  		closeBtnInside: true,
  		preloader: false,
  		midClick: true,
  		removalDelay: 300,
  		mainClass: 'my-mfp-zoom-in'
    });
  }

  _viewCard() {

  }

  render() {
    var data = this.props.cardData;
    var imgPath = 'http://dccards.info/assets/images/cards/card/' + data.image;

    return(
      <a className="card-info-link" href="#card-modal" onClick={this._viewCard}>
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
