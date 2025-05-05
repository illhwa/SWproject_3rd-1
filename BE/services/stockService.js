const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const SYMBOL_FILE = path.join(__dirname, '../data/symbols.csv'); // 저장된 csv 위치

// CSV에서 최대 n개 심볼 읽기
function getSymbolsFromCSV(limit = 100) {
  try {
    const data = fs.readFileSync(SYMBOL_FILE, 'utf-8');
    const lines = data.split('\n');
    const symbols = lines.map(line => line.trim()).filter(Boolean);
    return symbols.slice(0, limit);
  } catch (err) {
    console.error('CSV 파일 읽기 실패:', err.message);
    return [];
  }
}

// Alpha Vantage로부터 종목 데이터 받아오기
async function getStockData(symbol) {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error(`Error fetching data for ${symbol}:`, err.message);
    return null;
  }
}

// 여러 종목에 대한 데이터 수집
async function getMultipleStockData(limit = 20) {
  const symbols = getSymbolsFromCSV(limit);
  const result = [];

  for (const symbol of symbols) {
    const data = await getStockData(symbol);

    if (data && data['Time Series (5min)']) {
      const times = Object.keys(data['Time Series (5min)']);
      if (times.length >= 2) {
        const latest = data['Time Series (5min)'][times[0]];
        const previous = data['Time Series (5min)'][times[1]];

        const latestClose = parseFloat(latest['4. close']);
        const previousClose = parseFloat(previous['4. close']);

        const changePercent = ((latestClose - previousClose) / previousClose) * 100;

        result.push({
          symbol,
          latestClose,
          changePercent: parseFloat(changePercent.toFixed(2))
        });
      }
    }

    // Alpha Vantage는 분당 5개 호출 제한 → 최소 12초 간격 권장
    await new Promise(resolve => setTimeout(resolve, 12000));
  }

  console.log('가져온 종목 수:', result.length);
  return result;
}

module.exports = {
  getMultipleStockData,
  getStockData
};
