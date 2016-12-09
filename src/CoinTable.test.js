import React from 'react';
import ReactDOM from 'react-dom';
import CoinTable from './CoinTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CoinTable />, div);
});
