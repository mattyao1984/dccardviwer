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
    var imgPath = 'http://dccards.info/assets/images/cards/card/' + this.props.data.image;

    return(
      <div className="card-modal">
        <div className="modal-content">
          <a className="close-modal" onClick={this.hideModal}></a>

          <div className="row">
            <div className="col-md-4">
              <img src={imgPath} />
            </div>

            <div className="col-md-8">
              <table>
                <thead>
                  <tr>
                    <th colSpan="7" className="table-header">Stats</th>
                  </tr>
                  <tr>
                    <th></th>
                    <th>Health</th>
                    <th>Psyche</th>
                    <th>Attack</th>
                    <th>Defense</th>
                    <th>Speed</th>
                    <th>Intelligence</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="align-left">Lv 1</td>
                    <td>{this.props.data.stats.healthMin}</td>
                    <td>{this.props.data.stats.psycheMin}</td>
                    <td>{this.props.data.stats.attackMin}</td>
                    <td>{this.props.data.stats.defenseMin}</td>
                    <td>{this.props.data.stats.speedMin}</td>
                    <td>{this.props.data.stats.intelligenceMin}</td>
                  </tr>
                  <tr>
                    <td className="align-left">Lv Max</td>
                    <td>{this.props.data.stats.healthMax}</td>
                    <td>{this.props.data.stats.psycheMax}</td>
                    <td>{this.props.data.stats.attackMax}</td>
                    <td>{this.props.data.stats.defenseMax}</td>
                    <td>{this.props.data.stats.speedMax}</td>
                    <td>{this.props.data.stats.intelligenceMax}</td>
                  </tr>
                </tbody>
              </table>

              <table>
                <thead>
                  <tr>
                    <th colSpan="2" className="table-header">Skillset</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Level 01</td>
                    <td>{this.props.data.skillset.level01}</td>
                  </tr>
                  <tr>
                    <td>Level 15</td>
                    <td>{this.props.data.skillset.level15}</td>
                  </tr>
                  <tr>
                    <td>Level 30</td>
                    <td>{this.props.data.skillset.level30}</td>
                  </tr>
                  <tr>
                    <td>Level 40</td>
                    <td>{this.props.data.skillset.level40}</td>
                  </tr>
                  <tr>
                    <td>Level 50</td>
                    <td>{this.props.data.skillset.level50}</td>
                  </tr>
                  <tr>
                    <td>Redeath</td>
                    <td>{this.props.data.skillset.redeath}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="modal-overlay" onClick={this.hideModal}></div>
      </div>
    );
  }
};

export default CardModal;
