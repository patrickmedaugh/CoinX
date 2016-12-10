import React, { Component } from 'react';
import Chart from 'chart.js';
import $ from 'jquery';
import './CoinChart.css';

const serverUrl = process.env.URL || 'http://localhost:8080'

class CoinChart extends Component {


  componentDidMount() {
    let ethereumData = [];
    let litecoinData = [];
    let dashData     = [];
    this.callServices().then(([dashRes, ethereumRes, litecoinRes]) => {
      dashRes.forEach((doc) => {
        dashData.push(doc.data.rate);
      });
      litecoinRes.forEach((doc) => {
        litecoinData.push(doc.data.rate);
      });
      ethereumRes.forEach((doc) => {
        ethereumData.push(doc.data.rate);
      });
    }).then(() => {
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
            data: litecoinData,
          },
          {
            label: "Ethereum",
            fillColor: "rgba(255,255,255,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: ethereumData,
          },
          {
            label: "DASH",
            fillColor: "rgba(255,255,255,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: dashData,
          }
        ]
      };

      const ctx = document.getElementById("CoinChart-canvas").getContext("2d");
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
      }

      new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
      });
    });
  }

  callServices() {
    return Promise.all([
      this.dash(),
      this.ethereum(),
      this.liteCoin()
    ])
  }

  dash() {
    return $.get(serverUrl + '/chart/dash');
  }

  ethereum() {
    return $.get(serverUrl + '/chart/ethereum');
  }

  liteCoin() {
    return $.get(serverUrl + '/chart/dash');
  }

  render() {
    return (
      <div id="CoinChart" className="CoinChart">
      <canvas id="CoinChart-canvas" height="100"></canvas>
      </div>
    )
  }
}

export default CoinChart;
