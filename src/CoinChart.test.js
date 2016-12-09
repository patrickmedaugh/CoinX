import React from 'react';
import ReactDOM from 'react-dom';
import CoinChart from './CoinChart';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CoinChart />, div);
});
