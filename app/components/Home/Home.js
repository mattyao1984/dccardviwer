import React from 'react';
import logger from 'morgan';
import $ from 'jquery';
import _ from 'lodash';
import CardsStore from '../../stores/cardsStores';
import CardsActions from '../../actions/cardsActions';
import CardList from '../CardList/CardList';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      allCards: CardsStore.getAllCards()
    };

    this.render = this.render.bind(this);
    this._onLoad = this._onLoad.bind(this);
  }

  componentDidMount() {

    CardsStore.addChangeListener(this._onLoad);
    CardsActions.loadCards();
  }

  componentWillUnmount() {
    CardsStore.removeChangeListener(this._onLoad);
    CardsStore.removeChangeListener(this._onChange);
  }

  _onLoad() {
    this.setState({
      allCards: CardsStore.getAllCards()
    });

    console.log(this.state.allCards);
  }

  render () {
    return (
      <div className="page home">
        <div className="container">
          <h2>Deadman's Cross Cards Viwer</h2>
          <hr />
          <div className="cards-block">
            <CardList data={this.state.allCards} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
