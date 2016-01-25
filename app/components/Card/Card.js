import React from 'react';
import logger from 'morgan';
import _ from 'lodash';
import ImageLoader from 'react-imageloader';
import CardsStore from '../../stores/cardsStores';
import CardsActions from '../../actions/cardsActions';

class Card extends React.Component {
  constructor() {
    super();

    this.render = this.render.bind(this);
    this._viewCard = this._viewCard.bind(this);
  }

  _viewCard() {
    CardsActions.selectCard(this.props.cardData._id);
    $('.card-modal, .modal-content').toggleClass('show');
  }

  preloader() {
    return <img src="/img/ajax-loader.gif" className="image-loader" />;
  }

  render() {
    var data = this.props.cardData;
    var imgPath = 'http://dccards.info/assets/images/cards/card/' + data.image;

    return(
      <a className="card-info-link" onClick={this._viewCard}>
        <div className="flipper">
          <div className="flipper-front">
              <ImageLoader
                src={imgPath}
                preloader={this.preloader}>
                Image load failed!
              </ImageLoader>
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
