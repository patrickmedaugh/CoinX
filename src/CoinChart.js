import React, { Component } from 'react';
import Chart from 'chart.js';
import './CoinChart.css';

const serverUrl = process.env.URL || 'http://localhost:8080'

class CoinChart extends Component {
  render() {
    const litecoinMongoData = this.props.litecoinMongo.map((rec) => {
      return rec.data.rate
    });

    const ethereumMongoData = this.props.ethereumMongo.map((rec) => {
      return rec.data.rate
    });

    const dashMongoData = this.props.dashMongo.map((rec) => {
      return rec.data.rate
    });

    let data = {
      labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      datasets: [
        {
          label: "Litecoin",
          fillColor: "rgba(255,255,255,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: litecoinMongoData,
        },
        {
          label: "Ethereum",
          fillColor: "rgba(255,255,255,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: ethereumMongoData,
        },
        {
          label: "DASH",
          fillColor: "rgba(255,255,255,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: dashMongoData,
        }
      ]
    };

    const options = {
      scales: {
        yAxes: [{
          display: true,
          stacked: true,
          ticks: {
            min: .01,
            max: .035,
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
