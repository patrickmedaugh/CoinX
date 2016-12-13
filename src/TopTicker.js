import React, { Component } from 'react';
import './TopTicker.css';

class CurrencyCard extends Component {
  render() {
    return (
      <div className="Currency-card">
        <h3 className="Currency-card--header">{this.props.name}</h3>
        <div className="Currency-card--average">{this.props.avg}</div>
        <table className="Currency-card--table">
          <tbody>
            <tr>
              <td>High </td>
              <td>{this.props.high}</td>
              <td>Buy </td>
              <td>{this.props.buy}</td>
            </tr>
            <tr>
              <td>Low </td>
              <td>{this.props.low}</td>
              <td>Sell </td>
              <td>{this.props.sell}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td> </td>
              <td></td>
            </tr>
          </tbody>
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
      currencies: [
        'ethereum',
        'litecoin',
        'dash',
      ],
      exchange: 'bitcoin',
    }
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.incrementCard();
    }, 3000);
  }

  getCurrentCurrency() {
    return this.state.currencies[this.state.currentCard];
  }

  buttonIncrementCard() {
    clearInterval(this.interval);
    this.incrementCard();
  }

  buttonDecrementCard() {
    clearInterval(this.interval);
    this.decrementCard();
  }

  decrementCard() {
    if (this.state.currentCard === 0) {
      this.setState({currentCard: this.state.currencies.length - 1});
    } else {
      this.setState({currentCard: this.state.currentCard - 1});
    }
  }

  incrementCard() {
    if (this.state.currentCard === this.state.currencies.length - 1) {
      this.setState({currentCard: 0});
    } else {
      this.setState({currentCard: this.state.currentCard + 1});
    }
  }

  renderBtceCard(currency, exchange) {
    return (
      <CurrencyCard id={`${currency}_${exchange}-btce-card`} name={currency}
        high={this.props[`${currency}_${exchange}BtceHigh`]} low={this.props[`${currency}_${exchange}BtceLow`]} avg={this.props[`${currency}_${exchange}BtceAvg`]}
        buy={this.props[`${currency}_${exchange}BtceBuy`]} sell={this.props[`${currency}_${exchange}BtceSell`]} />
    )
  }

  setExchange(exchange) {
    this.setState({exchange: exchange});
  }

  tabIsActive(tabName) {
    if (this.state.exchange === tabName) {
      return "Top-ticker--nav-select active-tab"
    } else {
      return "Top-ticker--nav-select "
    };
  }

  render() {
    return (
      <div className="Top-ticker">
        <div className="Top-ticker--nav">
          <span onClick={this.setExchange.bind(this, 'bitcoin')} className={this.tabIsActive('bitcoin')} id="top-ticker-bitcoin">Bitcoin</span>
          <span onClick={this.setExchange.bind(this, 'usd')} className={this.tabIsActive('usd')} id="top-ticker-usd">USD</span>
        </div>
        {this.renderBtceCard(this.getCurrentCurrency(), this.state.exchange)}
        <div className="Top-ticker--buttons">
          <button className="Top-ticker--buttons-left" onClick={this.buttonDecrementCard.bind(this)}>&lt;</button>
          <button className="Top-ticker--buttons-right" onClick={this.buttonIncrementCard.bind(this)}>&gt;</button>
        </div>
      </div>
    );
  }

}

export default TopTicker;
