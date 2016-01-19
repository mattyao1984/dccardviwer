import React from 'react';
import logger from 'morgan';
import $ from 'jquery';
import _ from 'lodash';
import CardsStore from '../../stores/cardsStores';
import CardsActions from '../../actions/cardsActions';

class CardFilter extends React.Component {
  constructor() {
    super()
    this.state = {
      allRarities: CardsStore.getRarities(),
      allSpawnAreas: CardsStore.getSpawnAreas(),
      allStrains: CardsStore.getStrains()
    };

    this.render = this.render.bind(this);
    this._onLoad = this._onLoad.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }

  componentDidMount() {
    CardsStore.addChangeListener(this._onLoad);
    CardsActions.loadRarities();
    CardsActions.loadStrains();
    CardsActions.loadSpawnAreas();
  }

  componentWillUnmount() {
    CardsStore.removeChangeListener(this._onLoad);
    CardsStore.removeChangeListener(this._onRefresh);
  }

  _onLoad() {
    this.setState({
      allRarities: CardsStore.getRarities(),
      allSpawnAreas: CardsStore.getSpawnAreas(),
      allStrains: CardsStore.getStrains()
    });
  }

  _onRefresh() {
    var filters = {
      rarity: this.refs.rarity_list.value,
      strain: this.refs.strain_list.value,
      spawnArea: this.refs.spawn_area_list.value
    };

    CardsActions.loadCards(this.props.perpage, this.props.offset, filters);
    CardsActions.updateFilter(filters);
  }

  render() {
    let filterClass = 'filterContent ' + this.props.classData;
    let myRarities = [];
    let mySpawnAreas = [];
    let myStrains = [];

    myRarities.push(<option value='All' key='all_rarity'>All</option>);
    this.state.allRarities.forEach((r, index) =>
      myRarities.push(
        <option value={r} key={index + '_rarity'}>{r}</option>
      )
    );

    myStrains.push(<option value='All' key='all_strain'>All</option>);
    this.state.allStrains.forEach((s, index) =>
      myStrains.push(
        <option value={s} key={index + '_strain'}>{s}</option>
      )
    );

    mySpawnAreas.push(<option value='All' key='all_spawn_area'>All</option>);
    this.state.allSpawnAreas.forEach((sp, index) =>
      mySpawnAreas.push(
        <option value={sp.name} key={index + '_spawn_area'}>{sp.name}</option>
      )
    );

    return(
      <div className={filterClass}>
        <div className="row">
          <div className="col-md-3">
            <p>Rarity:</p>
            <select className="form-control" ref="rarity_list">
              {myRarities}
            </select>
          </div>

          <div className="col-md-3">
            <p>Spawn Area:</p>
            <select className="form-control" ref="spawn_area_list">
              {mySpawnAreas}
            </select>
          </div>

          <div className="col-md-3">
            <p>Strain:</p>
            <select className="form-control" ref="strain_list">
              {myStrains}
            </select>
          </div>

          <div className="col-md-3">
            <input type="button" className="btn btn-primary refresh-btn" value="Refresh Results" onClick={this._onRefresh} />
          </div>
        </div>
      </div>
    );
  }
};

export default CardFilter;
