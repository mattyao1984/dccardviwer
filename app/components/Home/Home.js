import React from 'react';
import logger from 'morgan';
import ReactPaginate from 'react-paginate';
import $ from 'jquery';
import _ from 'lodash';
import CardsStore from '../../stores/cardsStores';
import CardsActions from '../../actions/cardsActions';
import CardList from '../CardList/CardList';

var PER_PAGE = 10;

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      allCards: CardsStore.getAllCards(),
      offset: 0
    };

    this.render = this.render.bind(this);
    this._onLoad = this._onLoad.bind(this);
    this._onPageClick = this._onPageClick.bind(this);
  }

  componentDidMount() {
    CardsStore.addChangeListener(this._onLoad);
    CardsActions.loadCards(PER_PAGE, this.state.offset);
  }

  componentWillUnmount() {
    CardsStore.removeChangeListener(this._onLoad);
    CardsStore.removeChangeListener(this._onChange);
  }

  _onLoad() {
    this.setState({
      allCards: CardsStore.getAllCards()
    });
  }

  _onPageClick(data){
    let selected = data.selected;
    let offset = Math.ceil(selected * PER_PAGE);

    this.setState({
      offset: offset
    }, () => {
      CardsActions.loadCards(PER_PAGE, offset);

      this.setState({
        pageNum: CardsStore.getPageNum()
      })
    });
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

          <ReactPaginate previousLabel={"previous"}
           nextLabel={"next"}
           breakLabel={<li className="break"><a href="">...</a></li>}
           pageNum={this.state.pageNum}
           marginPagesDisplayed={2}
           pageRangeDisplayed={5}
           clickCallback={this._onPageClick}
           containerClassName={"pagination"}
           subContainerClassName={"pages pagination"}
           activeClassName={"active"} />
        </div>
      </div>
    );
  }
}

export default Home;
