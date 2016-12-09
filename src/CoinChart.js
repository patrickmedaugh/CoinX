import React, { Component } from 'react';
import Chart from 'chart.js';
import $ from 'jquery';
import './CoinChart.css';

const serverUrl = process.env.URL || 'http://localhost:8080'

class CoinChart extends Component {
  componentDidMount() {
    let ethereumData = [];
    let dashData = [];
    let litecoinData = [];

    $.get(serverUrl + '/chart/ethereum').done((collection) => {
      collection.forEach((record) => {
        ethereumData.push(parseInt(record.data.rate * 10000));
      })
    });

    $.get(serverUrl + '/chart/dash').done((collection) => {
      collection.forEach((record) => {
        dashData.push(parseInt(record.data.rate * 10000));
      })
    });

    $.get(serverUrl + '/chart/dash').done((collection) => {
      collection.forEach((record) => {
        litecoinData.push(parseInt(record.data.rate * 10000));
      })
    });

    let data = {
            labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            datasets: [
                {
                    label: "Litecoin",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: litecoinData,
                },
                {
                    label: "Ethereum",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: ethereumData,
                },
                {
                    label: "DASH",
                    fillColor: "rgba(151,187,205,0.2)",
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
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }]
      }
  };

    const lineChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });
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
