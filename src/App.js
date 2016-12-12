import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import CoinTable from './CoinTable';
import TopTicker from './TopTicker';
import CoinChart from './CoinChart';

const serverUrl = process.env.URL || 'http://localhost:8080'

class AppService {
  getPath (currency, exchange, api) {
    return `${serverUrl}/${api}/${currency}_${exchange}`
  };

  getMongoQuery(currency, exchange) {
    return $.get(this.getPath(currency, exchange, 'mongo'));
  };

  getMongoQueries() {
    return Promise.all([
      this.getMongoQuery('litecoin', 'bitcoin'),
      this.getMongoQuery('dash', 'bitcoin'),
      this.getMongoQuery('ethereum', 'bitcoin'),
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

  getCurrency(currency, exchange, api) {
    return $.get(this.getPath(currency, exchange, api))
  };

  getBtceCurrencies(exchange) {
    return Promise.all([
      this.getCurrency('litecoin', exchange, 'btce'),
      this.getCurrency('bitcoin', 'usd', 'btce'),
      this.getCurrency('dash', exchange, 'btce'),
      this.getCurrency('ethereum', exchange, 'btce'),
    ]);
  };

  getPoloniexCurrencies() {
    return Promise.all([
      this.getCurrency('litecoin', 'bitcoin', 'poloniex'),
      this.getCurrency('dash', 'bitcoin', 'poloniex'),
      this.getCurrency('ethereum', 'bitcoin', 'poloniex'),
    ]);
  };

  getCurrencies(component, exchange) {
    this.getPoloniexCurrencies()
    .then(([litecoinPlx, dashPlx, ethereumPlx]) => {
      const accumulator = {
        litecoinPlx:          litecoinPlx,
        ethereumPlx:          ethereumPlx,
        dashPlx:              dashPlx,
      }
      component.setState(accumulator);
    });
    this.getBtceCurrencies(exchange)
    .then(([litecoinBtce, bitcoinBtce, dashBtce, ethereumBtce]) => {
      const accumulator = {
        litecoinBtceAvg:      parseFloat(litecoinBtce.avg).toFixed(4),
        litecoinBtceHigh:     parseFloat(litecoinBtce.high).toFixed(4),
        litecoinBtceLow:      parseFloat(litecoinBtce.low).toFixed(4),
        litecoinBtceBuy:      parseFloat(litecoinBtce.buy).toFixed(4),
        litecoinBtceSell:     parseFloat(litecoinBtce.sell).toFixed(4),
        bitcoinBtceAvg:       parseFloat(bitcoinBtce.avg).toFixed(2),
        bitcoinBtceHigh:      parseFloat(bitcoinBtce.high).toFixed(4),
        bitcoinBtceLow:       parseFloat(bitcoinBtce.low).toFixed(4),
        bitcoinBtceBuy:       parseFloat(bitcoinBtce.buy).toFixed(4),
        bitcoinBtceSell:      parseFloat(bitcoinBtce.sell).toFixed(4),
        dashBtceAvg:          parseFloat(dashBtce.avg).toFixed(4),
        dashBtceHigh:         parseFloat(dashBtce.high).toFixed(4),
        dashBtceLow:          parseFloat(dashBtce.low).toFixed(4),
        dashBtceBuy:          parseFloat(dashBtce.buy).toFixed(4),
        dashBtceSell:         parseFloat(dashBtce.sell).toFixed(4),
        ethereumBtceAvg:      parseFloat(ethereumBtce.avg).toFixed(4),
        ethereumBtceHigh:     parseFloat(ethereumBtce.high).toFixed(4),
        ethereumBtceLow:      parseFloat(ethereumBtce.low).toFixed(4),
        ethereumBtceBuy:      parseFloat(ethereumBtce.buy).toFixed(4),
        ethereumBtceSell:     parseFloat(ethereumBtce.sell).toFixed(4),
      }
      console.log(exchange, accumulator)
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
    this.state = { exchange: 'bitcoin' };
    const appServe   = new AppService();
    appServe.queryMongo(this);
    appServe.getCurrencies(this, this.state.exchange);
  }

  setExchange(exchange) {
    this.setState({exchange: exchange});
    const appServe   = new AppService();
    appServe.getCurrencies(this, exchange);
  }

  render() {
      if (this.state.litecoinMongo !== undefined) {
      return (
        <div className="App">
          <div className="App-header">
            <h2 className="App-header--header">CoinX</h2>
          </div>
          <div className="Top-ticker--nav">
            <span onClick={this.setExchange.bind(this, 'bitcoin')} className="Top-ticker--nav-select" id="top-ticker-bitcoin">Bitcoin</span>
            <span onClick={this.setExchange.bind(this, 'usd')} className="Top-ticker--nav-select" id="top-ticker-usd">USD</span>
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
