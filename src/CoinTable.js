import React, { Component } from 'react';
import './CoinTable.css';

let btce = {
  key: process.env.BTCE_KEY,
  secret: process.env.BTCE_SECRET,
  url: "https://btc-e.com:443/api/2/",
}

class CoinTable extends Component {
  getCurrencies() {

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
              <td id="ethereum-btce-cointable"></td>
              <td id="litecoin-btce-cointable"></td>
              <td id="dash-btce-cointable"></td>
            </tr>
            <tr>
              <td id="ethereum-poloniex-cointable"></td>
              <td id="litecoin-poloniex-cointable"></td>
              <td id="dash-poloniex-cointable"></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CoinTable;
