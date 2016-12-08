import React, { Component } from 'react';
import './CoinTable.css';
import $ from 'jquery';

const serverUrl = process.env.URL || 'http://localhost:8080'
const getPath = (currency, api) => {
    return `${serverUrl}/${api}/${currency}`
}

class CoinTable extends Component {
  constructor() {
    super()
    this.state = {
      bitcoinUSD: "",
      ethereumBtce: "-",
      litecoinBtce: "-",
      dashBtce: "-",
      ethereumPlx: "-",
      litecoinPlx: "-",
      dashPlx: "-",
    };
  }

  componentDidMount() {
      this.getCurrencies();
  }

  getCurrencies() {
    $.get(getPath('litecoin', 'btce')).done((data) => {
      this.setState({litecoinBtce: data.ltc_btc.avg})
    })

    $.get(getPath('bitcoin', 'btce')).done((data) => {
      this.setState({bitcoinUSD: data.btc_usd.avg})
    });

    $.get(getPath('dash', 'poloniex')).done((data) => {
      this.setState({dashPlx: data})
    })

    $.get(getPath('litecoin', 'poloniex')).done((data) => {
      this.setState({litecoinPlx: data})
    })

    $.get(getPath('ethereum', 'poloniex')).done((data) => {
      this.setState({ethereumPlx: data})
    })
  }

  render() {
    return (
      <div className="Coin-table-section">
        <table className="Coin-table">
          <thead>
            <td></td>
            <td>Poloniex</td>
            <td>BTC-E</td>
          </thead>
          <tbody>
            <tr className="left-labels">
              <td id="ethereum-label">Ethereum</td>
              <td id="ethereum-poloniex-cointable">{this.state.ethereumPlx}</td>
              <td id="ethereumBtce-cointable">{this.state.ethereumBtce}</td>
            </tr>
            <tr>
              <td id="dash-label">DASH</td>
              <td id="dash-poloniex-cointable">{this.state.dashPlx}</td>
              <td id="dashBtce-cointable">{this.state.dashBtce}</td>
            </tr>
            <tr>
              <td id="litecoin-label">Litecoin</td>
              <td id="litecoin-poloniex-cointable">{this.state.litecoinPlx}</td>
              <td id="litecoinBtce-cointable">{this.state.litecoinBtce}</td>

            </tr>
          </tbody>
        </table>
        <button onClick={this.getCurrencies.bind(this)}>Refresh</button>
      </div>
    );
  }

}

export default CoinTable;
