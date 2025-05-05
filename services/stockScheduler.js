const axios = require('axios');
const db = require('../models/db');

const API_KEY = process.env.ALPHA_VANTAGE_KEY;
const symbols = ['AAPL', 'TSLA', 'MSFT', 'NVDA', 'KO', 'AMZN', 'GOOGL', 'META', 'INTC', 'DIS']; // 필요한 종목들

async function fetchAndSaveStockData() {
  for (const symbol of symbols) {
    try {
      const res = await axios.get(`https://www.alphavantage.co/query`, {
        params: {
          function: 'TIME_SERIES_INTRADAY',
          symbol,
          interval: '5min',
          apikey: API_KEY
        }
      });

      const timeSeries = res.data['Time Series (5min)'];
      if (!timeSeries) continue;

      const times = Object.keys(timeSeries);
      const latest = parseFloat(timeSeries[times[0]]['4. close']);
      const previous = parseFloat(timeSeries[times[1]]['4. close']);
      const changePercent = ((latest - previous) / previous * 100).toFixed(2);

      const sql = 'INSERT INTO stocks (symbol, price, change_percent) VALUES (?, ?, ?)';
      db.query(sql, [symbol, latest, changePercent]);
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error.message);
    }
  }
}

// 1시간마다 실행 (cron 대신 setInterval 사용)
setInterval(fetchAndSaveStockData, 1000 * 60 * 60); // 매 1시간마다
module.exports = fetchAndSaveStockData;
