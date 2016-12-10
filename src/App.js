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
  }

  getCurrencies(component) {
    this.getServices(component)
    .then(([litecoinBtce, litecoinPlx, bitcoinBtce, dashBtce, dashPlx, ethereumBtce, ethereumPlx]) => {
      const accumulator = {
        litecoinBtceAvg:      litecoinBtce.avg,
        litecoinBtceHigh:     litecoinBtce.high,
        litecoinBtceLow:      litecoinBtce.low,
        litecoinBtceBuy:      litecoinBtce.buy,
        litecoinBtceSell:     litecoinBtce.sell,
        litecoinBtceVol:      litecoinBtce.vol,
        bitcoinBtceAvg:       bitcoinBtce.avg,
        bitcoinBtceHigh:      bitcoinBtce.high,
        bitcoinBtceLow:       bitcoinBtce.low,
        bitcoinBtceBuy:       bitcoinBtce.buy,
        bitcoinBtceSell:      bitcoinBtce.sell,
        bitcoinBtceVol:       bitcoinBtce.vol,
        dashBtceAvg:          dashBtce.avg,
        dashBtceHigh:         dashBtce.high,
        dashBtceLow:          dashBtce.low,
        dashBtceBuy:          dashBtce.buy,
        dashBtceSell:         dashBtce.sell,
        dashBtceVol:          dashBtce.vol,
        ethereumBtceAvg:      ethereumBtce.avg,
        ethereumBtceHigh:     ethereumBtce.high,
        ethereumBtceLow:      ethereumBtce.low,
        ethereumBtceBuy:      ethereumBtce.buy,
        ethereumBtceSell:     ethereumBtce.sell,
        ethereumBtceVol:      ethereumBtce.vol,
        litecoinPlx:          litecoinPlx,
        ethereumPlx:          ethereumPlx,
        dashPlx:              dashPlx,
      }
      component.setState(accumulator);
    })
    .catch((err) =>{
      console.log(err);
    })
  }

  getServices(component) {
    return Promise.all([
      this.getCurrency(component, 'litecoin', 'btce'),
      this.getCurrency(component, 'litecoin', 'poloniex'),
      this.getCurrency(component, 'bitcoin', 'btce'),
      this.getCurrency(component, 'dash', 'btce'),
      this.getCurrency(component, 'dash', 'poloniex'),
      this.getCurrency(component, 'ethereum', 'btce'),
      this.getCurrency(component, 'ethereum', 'poloniex'),
    ]);
  }

  getCurrency(component, currency, api) {
    let response = {};
    return $.get(this.getPath(currency, api)).done((data) => {
      const attr = `${currency}${api}`;
      component.setState({attr:data});
    })
    return response;
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      litecoinBtce: '-',
      litecoinPlx:  '-',
      bitcoinUSD:   '-',
      ethereumBtce: '-',
      ethereumPlx:  '-',
      dashBtce:     '-',
      dashPlx:      '-',
    };
    const appServe   = new AppService();
    appServe.getCurrencies(this);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Coin Xchange</h2>
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
        <CoinChart />
        <CoinTable ethereumPlx={this.state.ethereumPlx} ethereumBtce={this.state.ethereumBtceAvg}
                   dashPlx={this.state.dashPlx} dashBtce={this.state.dashBtceAvg}
                   litecoinPlx={this.state.litecoinPlx} litecoinBtce={this.state.litecoinBtceAvg} />
      </div>
    );
  }
}

export default App;
