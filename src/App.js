import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import CoinTable from './CoinTable';
import TopTicker from './TopTicker';
import CoinChart from './CoinChart';

const serverUrl = process.env.URL || 'http://localhost:8080'

class AppService {
  getPath (currency, api) {
    return `${serverUrl}/${api}/${currency}`
  };

  getMongoQuery(currency) {
    return $.get(this.getPath(currency, 'mongo'));
  };

  getMongoQueries() {
    return Promise.all([
      this.getMongoQuery('litecoin'),
      this.getMongoQuery('dash'),
      this.getMongoQuery('ethereum'),
    ]);
  };

  queryMongo(component) {
    this.getMongoQueries()
    .then(([litecoinMongo, dashMongo, ethereumMongo]) => {
      const accumulator = {
        litecoinMongo: litecoinMongo,
        dashMongo:     dashMongo,
        ethereumMongo: ethereumMongo,
      }
      component.setState(accumulator)
    });
  };

  getCurrency(currency, api) {
    return $.get(this.getPath(currency, api))
  };

  getServices() {
    return Promise.all([
      this.getCurrency('litecoin', 'btce'),
      this.getCurrency('litecoin', 'poloniex'),
      this.getCurrency('bitcoin', 'btce'),
      this.getCurrency('dash', 'btce'),
      this.getCurrency('dash', 'poloniex'),
      this.getCurrency('ethereum', 'btce'),
      this.getCurrency('ethereum', 'poloniex'),
    ]);
  };

  getCurrencies(component) {
    this.getServices()
    .then(([litecoinBtce, litecoinPlx, bitcoinBtce, dashBtce, dashPlx, ethereumBtce, ethereumPlx]) => {
      const accumulator = {
        litecoinBtceAvg:      parseFloat(litecoinBtce.avg).toFixed(4),
        litecoinBtceHigh:     parseFloat(litecoinBtce.high).toFixed(4),
        litecoinBtceLow:      parseFloat(litecoinBtce.low).toFixed(4),
        litecoinBtceBuy:      parseFloat(litecoinBtce.buy).toFixed(4),
        litecoinBtceSell:     parseFloat(litecoinBtce.sell).toFixed(4),
        litecoinBtceVol:      parseFloat(litecoinBtce.vol).toFixed(0),
        bitcoinBtceAvg:       parseFloat(bitcoinBtce.avg).toFixed(2),
        bitcoinBtceHigh:      parseFloat(bitcoinBtce.high).toFixed(4),
        bitcoinBtceLow:       parseFloat(bitcoinBtce.low).toFixed(4),
        bitcoinBtceBuy:       parseFloat(bitcoinBtce.buy).toFixed(4),
        bitcoinBtceSell:      parseFloat(bitcoinBtce.sell).toFixed(4),
        bitcoinBtceVol:       parseFloat(bitcoinBtce.vol).toFixed(0),
        dashBtceAvg:          parseFloat(dashBtce.avg).toFixed(4),
        dashBtceHigh:         parseFloat(dashBtce.high).toFixed(4),
        dashBtceLow:          parseFloat(dashBtce.low).toFixed(4),
        dashBtceBuy:          parseFloat(dashBtce.buy).toFixed(4),
        dashBtceSell:         parseFloat(dashBtce.sell).toFixed(4),
        dashBtceVol:          parseFloat(dashBtce.vol).toFixed(0),
        ethereumBtceAvg:      parseFloat(ethereumBtce.avg).toFixed(4),
        ethereumBtceHigh:     parseFloat(ethereumBtce.high).toFixed(4),
        ethereumBtceLow:      parseFloat(ethereumBtce.low).toFixed(4),
        ethereumBtceBuy:      parseFloat(ethereumBtce.buy).toFixed(4),
        ethereumBtceSell:     parseFloat(ethereumBtce.sell).toFixed(4),
        ethereumBtceVol:      parseFloat(ethereumBtce.vol).toFixed(0),
        litecoinPlx:          litecoinPlx,
        ethereumPlx:          ethereumPlx,
        dashPlx:              dashPlx,
      }
      component.setState(accumulator);
    })
    .catch((err) =>{
      console.log(err);
    });
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = { init: '' };
    const appServe   = new AppService();
    appServe.queryMongo(this);
    appServe.getCurrencies(this);
  }

  render() {
      if (this.state.litecoinMongo !== undefined) {
      return (
        <div className="App">
          <div className="App-header">
            <h2 className="App-header--header">CoinX</h2>
          </div>
          <TopTicker litecoinBtceHigh={this.state.litecoinBtceHigh} litecoinBtceLow={this.state.litecoinBtceLow} litecoinBtceAvg={this.state.litecoinBtceAvg}
                     litecoinBtceBuy={this.state.litecoinBtceBuy} litecoinBtceSell={this.state.litecoinBtceSell} litecoinBtceVol={this.state.litecoinBtceVol}
                     ethereumBtceHigh={this.state.ethereumBtceHigh} ethereumBtceLow={this.state.ethereumBtceLow} ethereumBtceAvg={this.state.ethereumBtceAvg}
                     ethereumBtceBuy={this.state.ethereumBtceBuy} ethereumBtceSell={this.state.ethereumBtceSell} ethereumBtceVol={this.state.ethereumBtceVol}
                     bitcoinBtceHigh={this.state.bitcoinBtceHigh} bitcoinBtceLow={this.state.bitcoinBtceLow} bitcoinBtceAvg={this.state.bitcoinBtceAvg}
                     bitcoinBtceBuy={this.state.bitcoinBtceBuy} bitcoinBtceSell={this.state.bitcoinBtceSell} bitcoinBtceVol={this.state.bitcoinBtceVol}
                     dashBtceHigh={this.state.dashBtceHigh} dashBtceLow={this.state.dashBtceLow} dashBtceAvg={this.state.dashBtceAvg}
                     dashBtceBuy={this.state.dashBtceBuy} dashBtceSell={this.state.dashBtceSell} dashBtceVol={this.state.dashBtceVol}
          />
          <CoinChart litecoinMongo={this.state.litecoinMongo} ethereumMongo={this.state.ethereumMongo} dashMongo={this.state.dashMongo}/>
          <CoinTable ethereumPlx={this.state.ethereumPlx} ethereumBtce={this.state.ethereumBtceAvg}
                     dashPlx={this.state.dashPlx} dashBtce={this.state.dashBtceAvg}
                     litecoinPlx={this.state.litecoinPlx} litecoinBtce={this.state.litecoinBtceAvg} />
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default App;
