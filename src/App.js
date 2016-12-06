import dotenv from 'dotenv'
dotenv.config();
dotenv.load();
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CoinTable from './CoinTable';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Coin Xchange Table</h2>
            <CoinTable />
        </div>
      </div>
    );
  }
}

export default App;
