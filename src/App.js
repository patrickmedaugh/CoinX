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
    let accumulator = {};
    this.getPoloniexCurrencies()
    .then(([litecoinPlx, dashPlx, ethereumPlx]) => {
      accumulator[`litecoin_${exchange}Plx`] = litecoinPlx,
      accumulator[`ethereum_${exchange}Plx`] = ethereumPlx,
      accumulator[`dash_${exchange}Plx`] =     dashPlx,
      component.setState(accumulator);
    });
    accumulator = {};
    this.getBtceCurrencies(exchange)
    .then(([litecoinBtce, bitcoinBtce, dashBtce, ethereumBtce]) => {
      accumulator[`litecoin_${exchange}BtceAvg`] =           parseFloat(litecoinBtce.avg).toFixed(4),
      accumulator[`litecoin_${exchange}BtceHigh`] =          parseFloat(litecoinBtce.high).toFixed(4),
      accumulator[`litecoin_${exchange}BtceLow`] =            parseFloat(litecoinBtce.low).toFixed(4),
      accumulator[`litecoin_${exchange}BtceBuy`] =            parseFloat(litecoinBtce.buy).toFixed(4),
      accumulator[`litecoin_${exchange}BtceSell`] =           parseFloat(litecoinBtce.sell).toFixed(4),
      accumulator[`bitcoin_${exchange}BtceAvg`] =             parseFloat(bitcoinBtce.avg).toFixed(2),
      accumulator[`bitcoin_${exchange}BtceHigh`] =            parseFloat(bitcoinBtce.high).toFixed(4),
      accumulator[`bitcoin_${exchange}BtceLow`] =             parseFloat(bitcoinBtce.low).toFixed(4),
      accumulator[`bitcoin_${exchange}BtceBuy`] =             parseFloat(bitcoinBtce.buy).toFixed(4),
      accumulator[`bitcoin_${exchange}BtceSell`] =            parseFloat(bitcoinBtce.sell).toFixed(4),
      accumulator[`dash_${exchange}BtceAvg`] =                parseFloat(dashBtce.avg).toFixed(4),
      accumulator[`dash_${exchange}BtceHigh`] =               parseFloat(dashBtce.high).toFixed(4),
      accumulator[`dash_${exchange}BtceLow`] =                parseFloat(dashBtce.low).toFixed(4),
      accumulator[`dash_${exchange}BtceBuy`] =                parseFloat(dashBtce.buy).toFixed(4),
      accumulator[`dash_${exchange}BtceSell`] =               parseFloat(dashBtce.sell).toFixed(4),
      accumulator[`ethereum_${exchange}BtceAvg`] =            parseFloat(ethereumBtce.avg).toFixed(4),
      accumulator[`ethereum_${exchange}BtceHigh`] =           parseFloat(ethereumBtce.high).toFixed(4),
      accumulator[`ethereum_${exchange}BtceLow`] =            parseFloat(ethereumBtce.low).toFixed(4),
      accumulator[`ethereum_${exchange}BtceBuy`] =            parseFloat(ethereumBtce.buy).toFixed(4),
      accumulator[`ethereum_${exchange}BtceSell`] =           parseFloat(ethereumBtce.sell).toFixed(4),
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
    this.state = { 'init': 'true' }
    const exchanges = [
      'bitcoin',
      'usd',
    ]
    const appServe   = new AppService();
    appServe.queryMongo(this);
    exchanges.forEach((exchange) => {
      appServe.getCurrencies(this, exchange);
    });
  }



  render() {
      if (this.state.litecoinMongo !== undefined) {
      return (
        <div className="App">
          <div className="App-header">
            <h2 className="App-header--header">CoinX</h2>
          </div>

          <TopTicker litecoin_bitcoinBtceHigh={this.state.litecoin_bitcoinBtceHigh} litecoin_bitcoinBtceLow={this.state.litecoin_bitcoinBtceLow} litecoin_bitcoinBtceAvg={this.state.litecoin_bitcoinBtceAvg}
                     litecoin_bitcoinBtceBuy={this.state.litecoin_bitcoinBtceBuy} litecoin_bitcoinBtceSell={this.state.litecoin_bitcoinBtceSell} litecoin_bitcoinBtceVol={this.state.litecoin_bitcoinBtceVol}
                     ethereum_bitcoinBtceHigh={this.state.ethereum_bitcoinBtceHigh} ethereum_bitcoinBtceLow={this.state.ethereum_bitcoinBtceLow} ethereum_bitcoinBtceAvg={this.state.ethereum_bitcoinBtceAvg}
                     ethereum_bitcoinBtceBuy={this.state.ethereum_bitcoinBtceBuy} ethereum_bitcoinBtceSell={this.state.ethereum_bitcoinBtceSell} ethereum_bitcoinBtceVol={this.state.ethereum_bitcoinBtceVol}
                     bitcoin_usdBtceHigh={this.state.bitcoin_usdBtceHigh} bitcoin_usdBtceLow={this.state.bitcoin_usdBtceLow} bitcoin_usdBtceAvg={this.state.bitcoin_usdBtceAvg}
                     bitcoin_usdBtceBuy={this.state.bitcoin_usdBtceBuy} bitcoin_usdBtceSell={this.state.bitcoin_usdBtceSell} bitcoin_usdBtceVol={this.state.bitcoin_usdBtceVol}
                     dash_bitcoinBtceHigh={this.state.dash_bitcoinBtceHigh} dash_bitcoinBtceLow={this.state.dash_bitcoinBtceLow} dash_bitcoinBtceAvg={this.state.dash_bitcoinBtceAvg}
                     dash_bitcoinBtceBuy={this.state.dash_bitcoinBtceBuy} dash_bitcoinBtceSell={this.state.dash_bitcoinBtceSell} dash_bitcoinBtceVol={this.state.dash_bitcoinBtceVol}
                     litecoin_usdBtceHigh={this.state.litecoin_usdBtceHigh} litecoin_usdBtceLow={this.state.litecoin_usdBtceLow} litecoin_usdBtceAvg={this.state.litecoin_usdBtceAvg}
                     litecoin_usdBtceBuy={this.state.litecoin_usdBtceBuy} litecoin_usdBtceSell={this.state.litecoin_usdBtceSell} litecoin_usdBtceVol={this.state.litecoin_usdBtceVol}
                     ethereum_usdBtceHigh={this.state.ethereum_usdBtceHigh} ethereum_usdBtceLow={this.state.ethereum_usdBtceLow} ethereum_usdBtceAvg={this.state.ethereum_usdBtceAvg}
                     ethereum_usdBtceBuy={this.state.ethereum_usdBtceBuy} ethereum_usdBtceSell={this.state.ethereum_usdBtceSell} ethereum_usdBtceVol={this.state.ethereum_usdBtceVol}
                     dash_usdBtceHigh={this.state.dash_usdBtceHigh} dash_usdBtceLow={this.state.dash_usdBtceLow} dash_usdBtceAvg={this.state.dash_usdBtceAvg}
                     dash_usdBtceBuy={this.state.dash_usdBtceBuy} dash_usdBtceSell={this.state.dash_usdBtceSell} dash_usdBtceVol={this.state.dash_usdBtceVol}
          />
          <CoinChart litecoinMongo={this.state.litecoinMongo} ethereumMongo={this.state.ethereumMongo} dashMongo={this.state.dashMongo}/>
          <CoinTable ethereum_bitcoinPlx={this.state.ethereum_bitcoinPlx} ethereum_bitcoinBtce={this.state.ethereum_bitcoinBtceAvg}
                     dash_bitcoinPlx={this.state.dash_bitcoinPlx} dash_bitcoinBtce={this.state.dash_bitcoinBtceAvg}
                     litecoin_bitcoinPlx={this.state.litecoin_bitcoinPlx} litecoin_bitcoinBtce={this.state.litecoin_bitcoinBtceAvg}
                     ethereum_usdPlx="-" ethereum_usdBtce={this.state.ethereum_usdBtceAvg}
                     dash_usdPlx="-" dash_usdBtce={this.state.dash_usdBtceAvg}
                     litecoin_usdPlx="-" litecoin_usdBtce={this.state.litecoin_usdBtceAvg}
          />
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
