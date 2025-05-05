const axios = require('axios');

// CoinGecko에서 상위 100개 코인 데이터 수집
async function getCoinMarketData(limit = 100) {
  const url = `https://api.coingecko.com/api/v3/coins/markets`;
  try {
    const response = await axios.get(url, {
      params: {
        vs_currency: 'usd',
        order: 'percent_change_24h_desc',
        per_page: limit,
        page: 1,
      }
    });
    return response.data;
  } catch (err) {
    console.error('코인 데이터 가져오기 실패:', err.message);
    return [];
  }
}

module.exports = { getCoinMarketData };
