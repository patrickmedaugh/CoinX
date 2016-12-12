import React, { Component } from 'react';
import Chart from 'chart.js';
import './CoinChart.css';

class CoinChart extends Component {
  render() {
    let litecoinMongoData = this.props.litecoinMongo.map((rec) => {
      return rec.data.rate
    }).reverse();

    let ethereumMongoData = this.props.ethereumMongo.map((rec) => {
      return rec.data.rate
    }).reverse();

    let dashMongoData = this.props.dashMongo.map((rec) => {
      return rec.data.rate
    }).reverse();

    const allData = dashMongoData.concat(litecoinMongoData).concat(ethereumMongoData);
    const minimum = Math.min.apply(null, allData)
    const maximum = Math.max.apply(null, allData)
    const padding = (maximum - minimum) / 8;

    let data = {
      labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      datasets: [
        {
          label:           'Litecoin',
          fill:            false,
          borderColor:     '#bfbfbf',
          data:            litecoinMongoData,
        },
        {
          label:           'Ethereum',
          fill:            false,
          borderColor:     '#5c5c8a',
          data:            ethereumMongoData,
        },
        {
          label:           'DASH',
          fill:            false,
          borderColor:     '#80bfff',
          data:            dashMongoData,
        }
      ]
    };

    const options = {
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            min: Number(parseFloat(minimum - padding).toFixed(3)),
            max: Number(parseFloat(maximum + padding).toFixed(3)),
          }
        }]
      }
    };

    if (document.getElementById("CoinChart-canvas")) {
      const ctx = document.getElementById("CoinChart-canvas").getContext("2d");
      new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
      });
    }

    return (
      <div id="CoinChart" className="CoinChart">
        <canvas id="CoinChart-canvas" height="100"></canvas>
      </div>
    )
  }
}

export default CoinChart;
