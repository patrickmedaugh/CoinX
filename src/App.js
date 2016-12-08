import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CoinTable from './CoinTable';
import TopTicker from './TopTicker';
import CoinChart from './CoinChart';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Coin Xchange</h2>
        </div>
            <TopTicker />
            <CoinChart />
            <CoinTable />
      </div>
    );
  }
}

export default App;
