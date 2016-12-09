import $ from 'jquery';

const serverUrl = process.env.URL || 'http://localhost:8080'

class CoinTableService {
  getPath (currency, api) {
      return `${serverUrl}/${api}/${currency}`
  }

  getCurrencies() {
    let data = {};
    $.get(this.getPath('litecoin', 'btce')).done((data) => {
      data.litecoinBtce = data.avg
    });

    $.get(this.getPath('bitcoin', 'btce')).done((data) => {
      data.bitcoinUSD = parseFloat(data.avg).toFixed(2);
    });

    $.get(this.getPath('ethereum', 'btce')).done((data) => {
      data.ethereumBtce = data.avg;
    });

    $.get(this.getPath('dash', 'btce')).done((data) => {
      data.dashBtce = data.avg;
    })

    $.get(this.getPath('dash', 'poloniex')).done((data) => {
      data.dashPlx = data;
    });

    $.get(this.getPath('litecoin', 'poloniex')).done((data) => {
      data.litecoinPlx = data;
    });

    $.get(this.getPath('ethereum', 'poloniex')).done((data) => {
      data.ethereumPlx = data;
    });

    return data;
  }
}

export default CoinTableService;
