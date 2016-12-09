import React from 'react';
import ReactDOM from 'react-dom';
import TopTicker from './TopTicker';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TopTicker />, div);
});
