import React, { Component } from 'react';
import './CoinTable.css';
import $ from 'jquery';

const serverUrl = process.env.URL || 'http://localhost:8080'
const litecoinBtcePath = serverUrl + '/litecoin-btce';
const bitcoinBtcePath = serverUrl + '/bitcoin-btce';
const dashPlxPath = serverUrl + '/dash-poloniex';

class CoinTable extends Component {
  constructor() {
    super()
    this.state = {
      bitcoinUSD: "",
      ethereumBtce: "-",
      litecoinBtce: "-",
      dashBtce: "-",
      ethereumPol: "-",
      litecoinPol: "-",
      dashPol: "-",
    };
  }

  getCurrencies() {
    let litecoinBtce;
    let bitcoinUSD;

    $.get(litecoinBtcePath).done((data) => {
      this.setState({litecoinBtce: data.ltc_btc.avg})
    })

    $.get(bitcoinBtcePath).done((data) => {
      this.setState({bitcoinUSD: data.btc_usd.avg})
    });

    $.get(dashPlxPath).done((data) => {
      debugger;
    })
  }

  render() {
    return (
      <div className="Coin-table">
        <table className="Coin-table">
          <thead>
            <td>Ethereum</td>
            <td>Litecoin</td>
            <td>DASH</td>
          </thead>
          <tbody>
            <tr>
              <td id="ethereumBtce-cointable">{this.state.ethereumBtce}</td>
              <td id="litecoinBtce-cointable">{this.state.litecoinBtce}</td>
              <td id="dashBtce-cointable">{this.state.dashBtce}</td>
            </tr>
            <tr>
              <td id="ethereum-poloniex-cointable">{this.state.ethereumPol}</td>
              <td id="litecoin-poloniex-cointable">{this.state.litecoinPol}</td>
              <td id="dash-poloniex-cointable">{this.state.dashPol}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={this.getCurrencies.bind(this)}>Refresh</button>
      </div>
    );
  }

}

export default CoinTable;
