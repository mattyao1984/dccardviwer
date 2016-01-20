import React from 'react';
import logger from 'morgan';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';
import CardsStore from '../../stores/cardsStores';
import CardsActions from '../../actions/cardsActions';
import CardList from '../CardList/CardList';
import CardFilter from '../CardFilter/CardFilter';
import CardModal from '../CardModal/CardModal';

var PER_PAGE = 10;

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      allCards: CardsStore.getAllCards(),
      filterOptions: CardsStore.getFilterOptions(),
      offset: 0,
      showFilter: false
    };

    this.render = this.render.bind(this);
    this._onLoad = this._onLoad.bind(this);
    this._onPageClick = this._onPageClick.bind(this);
    this._onToggleFilter = this._onToggleFilter.bind(this);
  }

  componentDidMount() {
    CardsStore.addChangeListener(this._onLoad);
    CardsActions.loadCards(PER_PAGE, this.state.offset, {
      rarity: this.state.filterOptions.rarity,
      strain: this.state.filterOptions.strain,
      spawnArea:  this.state.filterOptions.spawnArea
    });

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

  componentWillUnmount() {
    CardsStore.removeChangeListener(this._onLoad);
  }

  _onLoad() {
    this.setState({
      allCards: CardsStore.getAllCards(),
      pageNum: CardsStore.getPageNum()
    });
  }

  _onPageClick(data){
    console.log('data: ', data, this);
    let selected = data.selected;
    let offset = Math.ceil(selected * PER_PAGE);
    let _obj = this;

    this.setState({
      offset: offset,
      filterOptions: CardsStore.getFilterOptions()
    }, () => {

      console.log('Click options: ', _obj.state);
      CardsActions.loadCards(PER_PAGE, offset, {
        rarity: this.state.filterOptions.rarity,
        strain: this.state.filterOptions.strain,
        spawnArea:  this.state.filterOptions.spawnArea
      });

      this.setState({
        pageNum: CardsStore.getPageNum()
      });
    });
  }

  _onToggleFilter() {
    this.setState({
      showFilter: !this.state.showFilter
    });
  }

  render () {
    let FilterContentClass = this.state.showFilter ? 'show' : '';
    let ShowFilterClass = 'btn btn-primary filter-btn pull-right ' + FilterContentClass;

    return (
      <div className="page home">
        <div className="container">
          <h2>Deadman's Cross Cards Viwer</h2>
          <input type="button" value={this.state.showFilter ? 'Hide Filter' : 'Show Filter'} onClick={this._onToggleFilter} className={ShowFilterClass} />
          <hr />
          <div className="filter-block">
            <CardFilter classData={FilterContentClass} perpage={PER_PAGE} offset={this.state.offset} />
          </div>
          <div className="cards-block">
            <CardList data={this.state.allCards} />
          </div>

          <CardModal />

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
