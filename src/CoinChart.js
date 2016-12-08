import React, { Component } from 'react';
import Chart from 'chart.js';
import './CoinChart.css';


class CoinChart extends Component {
  componentDidMount() {
    var data = {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            datasets: [
                {
                    label: "Prime and Fibonacci",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
                }
            ]
        };

        var ctx = document.getElementById("CoinChart-canvas").getContext("2d");
        var options = { };
        var lineChart = new Chart(ctx, {
          type: 'line',
          data: data,
          options: options,
        });
  }

  render() {
    return (
      <div id="CoinChart" className="CoinChart">
        <canvas id="CoinChart-canvas" height="100"></canvas>
        Chart goes here
      </div>
    )
  }
}

export default CoinChart;
