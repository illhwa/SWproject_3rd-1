const axios = require('axios');
const db = require('../models/db');
const API_KEY = process.env.ALPHA_VANTAGE_KEY;

async function fetchAndStoreStock(symbol) {
  try {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;
    const response = await axios.get(url);

    const timeSeries = response.data['Time Series (5min)'];
    if (!timeSeries) return;

    const latestTime = Object.keys(timeSeries)[0];
    const latest = timeSeries[latestTime];
    const price = parseFloat(latest['4. close']);

    const sql = 'INSERT INTO stock_data (symbol, price, timestamp) VALUES (?, ?, NOW())';
    db.query(sql, [symbol, price], (err) => {
      if (err) console.error(`${symbol} 저장 실패`, err);
    });
  } catch (err) {
    console.error(`${symbol} 가져오기 실패`, err.message);
  }
}

module.exports = { fetchAndStoreStock };
