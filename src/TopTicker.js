import React, { Component } from 'react';
import './TopTicker.css';
import $ from 'jquery';

const serverUrl = process.env.URL || 'http://localhost:8080'
const getPath = (currency, api) => {
    return `${serverUrl}/${api}/${currency}`
}

const topTickerCurrencies = [
  {
    name: 'litecoin',
    getBtce: () => {
      $.get(getPath('litecoin', 'btce')).done((data) => {
          this.setState({litecoinBtce: data.ltc_btc});
      });
    }
  },

  {
    name: 'bitcoin',
    getBtce: () => {
      $.get(getPath('bitcoin', 'btce')).done((data) => {
          this.setState({bitcoinBtce: data.btc_usd});
        });
      }
    },

  {
    name: 'ethereum',
    getBtce: () => {
      $.get(getPath('ethereum', 'btce')).done((data) => {
          this.setState({ethereumBtce: data.eth_btc});
        });
      }
    },
]

class CurrencyCard extends Component {
  render() {
    return (
      <div className="Currency-card">
      <table>
        <tr>
          <td>High: </td>
          <td>{this.props.high}</td>
        </tr>
        <tr>
          <td>Low: </td>
          <td>{this.props.low}</td>
        </tr>
        <tr>
          <td>Buy: </td>
          <td>{this.props.buy}</td>
        </tr>
        <tr>
          <td>Sell: </td>
          <td>{this.props.sell}</td>
        </tr>
        <tr>
          <td>Volume: </td>
          <td>{this.props.vol}</td>
        </tr>
      </table>
      </div>
    )
  }
}

class TopTicker extends Component {
  constructor() {
    super()
  }

  getInitialState() {
    return ({currentCard: 0})
  }

  componentDidMount() {
    this.getCardInfo();
  }

  incrementCard() {
    if (this.state.currentCard === topTickerCurrencies.length) {
      this.state.currentCard = 0;
    } else {
      this.state.currentCard += 1;
    }
  }

  getCardInfo() {
    //const tickerCurrency  = topTickerCurrencies[currentCard];
    //const currentCurrency = tickerCurrency.getBtce();
  }

  render() {
    const currentCurrency = topTickerCurrencies[0] //hardcoded Zero for now. Change this later.
    const currentAttrs    = currentCurrency.getBtce.call(this);
    return (
      <div className="Top-ticker">
        <CurrencyCard high="high" low="low" buy="buy" sell="sell" vol="vol"/>

      </div>
    );
  }

}

export default TopTicker;
