import React, { Component } from 'react';
import './CoinTable.css';



class CoinTable extends Component {
  render() {
    return (
      <div className="Coin-table--section">
        <table className="Coin-table--table">
          <thead className="Coin-table--table-header">
            <td></td>
            <td className="Coin-table--table-top-label">Poloniex</td>
            <td>BTC-E</td>
          </thead>
          <tbody>
            <tr>
              <td className="Coin-table--table-left-label" id="ethereum-label">Ethereum</td>
              <td id="ethereum-poloniex-cointable">{this.props.ethereumPlx}</td>
              <td id="ethereumBtce-cointable">{this.props.ethereumBtce}</td>
            </tr>
            <tr>
              <td className="Coin-table--table-left-label" id="dash-label">DASH</td>
              <td id="dash-poloniex-cointable">{this.props.dashPlx}</td>
              <td id="dashBtce-cointable">{this.props.dashBtce}</td>
            </tr>
            <tr>
              <td className="Coin-table--table-left-label" id="litecoin-label">Litecoin</td>
              <td id="litecoin-poloniex-cointable">{this.props.litecoinPlx}</td>
              <td id="litecoinBtce-cointable">{this.props.litecoinBtce}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

}

export default CoinTable;
