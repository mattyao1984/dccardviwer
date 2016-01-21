import React from 'react';
import logger from 'morgan';
import _ from 'lodash';
import CardsStore from '../../stores/cardsStores';
import CardsActions from '../../actions/cardsActions';

class CardModal extends React.Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
  }

  hideModal() {
    $('.card-modal, .modal-content').toggleClass('show');
  }

  render() {
    return(
      <div className="card-modal">
        <div className="modal-content">
          <a className="close-modal" onClick={this.hideModal}></a>
          {this.props.data.name}
          <h3>Test line.</h3>
        </div>
        <div className="modal-overlay" onClick={this.hideModal}></div>
      </div>
    );
  }
};

export default CardModal;
