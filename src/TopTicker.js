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
              <td>Volume</td>
              <td>{this.props.vol}</td>
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
        'bitcoin',
        'litecoin',
        'dash',
      ],
    }
  }

  componentDidMount() {
    this.incrementCard();
  }

  getCurrentCurrency() {
    return this.state.currencies[this.state.currentCard];
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

  setBtceCard(currency) {
    return (
      <CurrencyCard id={`${currency}-btce-card`} name={currency}
        high={this.props[`${currency}BtceHigh`]} low={this.props[`${currency}BtceLow`]} avg={this.props[`${currency}BtceAvg`]}
        buy={this.props[`${currency}BtceBuy`]} sell={this.props[`${currency}BtceSell`]} vol={this.props[`${currency}BtceVol`]} />
    )
  }

  render() {
    return (
      <div className="Top-ticker">
        {this.setBtceCard(this.getCurrentCurrency())}
        <div className="Top-ticker--buttons">
          <button onClick={this.decrementCard.bind(this)}>&lt;</button>
          <button onClick={this.incrementCard.bind(this)}>&gt;</button>
        </div>
      </div>
    );
  }

}

export default TopTicker;
