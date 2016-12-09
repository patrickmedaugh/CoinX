import React, { Component } from 'react';
import logo from './logo.svg';
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

  getCurrencies() {
    let accumulator = {}
    this.getServices().then(([litecoinBtce, litecoinPlx, bitcoinBtce, dashBtce, dashPlx, ethereumBtce, ethereumPlx]) => {
      accumulator.litecoinBtce = litecoinBtce;
      accumulator.litecoinPlx  = litecoinPlx;
      accumulator.bitcoinBtce  = bitcoinBtce;
      accumulator.dashBtce     = dashBtce;
      accumulator.dashPlx      = dashPlx;
      accumulator.ethereumBtce = ethereumBtce;
      accumulator.ethereumPlx  = ethereumPlx;
    });
    return accumulator;
  }

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
  }

  getCurrency(currency, api) {
    let response = {};
    return $.get(this.getPath(currency, api)).done((data) => {
      const attr = `${currency}${api}`
      response[attr] =  data;
    })
    return response;
  }
}

class App extends Component {
  constructor() {
    super();
    const appServe   = new AppService();
    const currencies = appServe.getCurrencies();
    this.state = {
      dashPlx: '-',
    };
  }

  componentDidMount() {
    const appServe   = new AppService();
    const currencies = appServe.getCurrencies();
    console.log(currencies)
    this.state = {
      dashPlx: currencies.dashPlx
    }
    console.log(this.state)
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Coin Xchange</h2>
        </div>
        <TopTicker />
        <CoinChart />
        <CoinTable dashPlx={this.state.dashPlx}/>
      </div>
    );
  }
}

export default App;
