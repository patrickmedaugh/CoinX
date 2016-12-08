import React, { Component } from 'react';
import './TopTicker.css';
import $ from 'jquery';

const serverUrl = process.env.URL || 'http://localhost:8080'
const getPath = (currency, api) => {
    return `${serverUrl}/${api}/${currency}`
}

const TopTickerCurrencies = [
  {
    name: 'litecoin',
    getBtce () {
      return $.get(getPath('litecoin', 'btce')).done((data) => {
          console.log('in litecoin object')
          console.log(this.state)
          this.setState({currentCurrencyName: 'litecoin'});
          this.setState({currentCurrencyAttrs: data.ltc_btc });
      });
    }
  },

  {
    name: 'bitcoin',
    getBtce () {
      $.get(getPath('bitcoin', 'btce')).done((data) => {
          console.log('in bitcoin object')
          console.log(this.state)
          this.setState({currentCurrencyName: 'bitcoin'});
          this.setState({currentCurrencyAttrs: data.btc_usd});
        });
      }
    },

  {
    name: 'ethereum',
    getBtce() {
      $.get(getPath('ethereum', 'btce')).done((data) => {
          console.log('in bitcoin object')
          console.log(this.state)
          this.setState({currentCurrencyName: 'ethereum'});
          this.setState({currentCurrencyAttrs: data.eth_btc});
        });
      }
    },
    {
      name: 'dash',
      getBtce() {
        $.get(getPath('dash', 'btce')).done((data) => {
          console.log('in dash object')
          console.log(this.state)
          this.setState({currentCurrencyName: 'dash'});
          this.setState({currentCurrencyAttrs: data.dsh_btc});
        })
      }
    },
]

class CurrencyCard extends Component {
  render() {
    return (
      <div className="Currency-card">
      <h3>{this.props.name}</h3>
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
      currentCard: 1,
      currencies: TopTickerCurrencies,
      currentCurrencyAttrs: {
        high: "-",
        low:  "-",
        buy:  "-",
        sell: "-",
        vol:  "-",
      }
    }
  }

  componentDidMount() {
    this.getCurrentCurrency();
  }

  getCurrentCurrency() {
    this.state.currencies[this.state.currentCard].getBtce.call(this);
  }

  incrementCard() {
    if (this.state.currentCard === this.state.currencies.length - 1) {
      this.setState({currentCard: 0});
    } else {
      this.setState({currentCard: this.state.currentCard + 1});
    }
    this.getCurrentCurrency();
  }

  render() {
    console.log(this.state)
    return (
      <div className="Top-ticker">
        <CurrencyCard name={this.state.currentCurrencyName} high={this.state.currentCurrencyAttrs.high} low={this.state.currentCurrencyAttrs.low} buy={this.state.currentCurrencyAttrs.buy} sell={this.state.currentCurrencyAttrs.sell} vol={this.state.currentCurrencyAttrs.vol}/>
          <button onClick={this.incrementCard.bind(this)} />
      </div>
    );
  }

}

export default TopTicker;
