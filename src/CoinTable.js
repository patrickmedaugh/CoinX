import React, { Component } from 'react';
import './CoinTable.css';



class CoinTable extends Component {
  constructor() {
    super();
    this.state = { exchange: 'bitcoin' };
  }

  setExchange(exchange) {
    this.setState({exchange: exchange});
  }

  tabIsActive(tabName) {
    if (this.state.exchange === tabName) {
      return "Coin-table--nav-select active-tab"
    } else {
      return "Coin-table--nav-select "
    };
  }

  renderCoinTable(exchange) {
    return (
      <table className="Coin-table--table">
        <thead className="Coin-table--table-header">
          <td></td>
          <td className="Coin-table--table-top-label">Poloniex</td>
          <td>BTC-E</td>
        </thead>
        <tbody>
          <tr>
            <td className="Coin-table--table-left-label" id="ethereum-label">Ethereum</td>
            <td id="ethereum-poloniex-cointable">{this.props[`ethereum_${exchange}Plx`]}</td>
            <td id="ethereumBtce-cointable">{this.props[`ethereum_${exchange}Btce`]}</td>
          </tr>
          <tr>
            <td className="Coin-table--table-left-label" id="dash-label">DASH</td>
            <td id="dash-poloniex-cointable">{this.props[`dash_${exchange}Plx`]}</td>
            <td id="dashBtce-cointable">{this.props[`dash_${exchange}Btce`]}</td>
          </tr>
          <tr>
            <td className="Coin-table--table-left-label" id="litecoin-label">Litecoin</td>
            <td id="litecoin-poloniex-cointable">{this.props[`litecoin_${exchange}Plx`]}</td>
            <td id="litecoinBtce-cointable">{this.props[`litecoin_${exchange}Btce`]}</td>
          </tr>
        </tbody>
      </table>
    )
  }

  render() {
    console.log(this.props)
    return (
      <div className="Coin-table--section">
        <div className="Coin-table--nav">
          <span onClick={this.setExchange.bind(this, 'bitcoin')} className={this.tabIsActive('bitcoin')} id="top-ticker-bitcoin">Bitcoin</span>
          <span onClick={this.setExchange.bind(this, 'usd')} className={this.tabIsActive('usd')} id="top-ticker-usd">USD</span>
        </div>
        {this.renderCoinTable(this.state.exchange)}
      </div>
    );
  }

}

export default CoinTable;
