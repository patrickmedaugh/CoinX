import React, { Component } from 'react';
import './TopTicker.css';
import $ from 'jquery';

const serverUrl = process.env.URL || 'http://localhost:8080'
const getPath = (currency, api) => {
    return `${serverUrl}/${api}/${currency}`
}

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
    this.state = {
      currentCard: 0,
    }
    this.currencies = [
      {
        name: 'litecoin',
        getBtce () {
          $.get(getPath('litecoin', 'btce')).done((data) => {
              return data.ltc_btc
          });
        }
      },

      {
        name: 'bitcoin',
        getBtce () {
          $.get(getPath('bitcoin', 'btce')).done((data) => {
              return data.btc_usd;
            });
          }
        },

      {
        name: 'ethereum',
        getBtce() {
          $.get(getPath('ethereum', 'btce')).done((data) => {
              return data.eth_btc;
            });
          }
        },
    ]
  }

  componentDidMount() {
    this.getCardInfo();
  }

  incrementCard() {
    if (this.state.currentCard === this.currencies.length) {
      this.setState({currentCard: 0});
    } else {
      this.setState({currentCard: this.state.currentCard + 1});
    }
  }

  getCardInfo() {
    //const tickerCurrency  = topTickerCurrencies[currentCard];
    //const currentCurrency = tickerCurrency.getBtce();
  }

  render() {
    //CANT call setState within render or it will re-render. Really need to think about this.
    //MAYBE setState, change the currentCard value and do a a timeout so it will re-render the next card??
    $.get(getPath('litecoin', 'btce')).done((data) => {
        //this.setState({currentCurrency: data.ltc_btc})
        return data.ltc_btc
    });
    const currentCurrency = this.currencies[1] //hardcoded Zero for now. Change this later.
    console.log(this.state)
    //-->Would something like this work: this.getCurrencies.bind(this)();
    return (
      <div className="Top-ticker">
        <CurrencyCard high="high" low="low" buy="buy" sell="sell" vol="vol"/>

      </div>
    );
  }

}

export default TopTicker;
