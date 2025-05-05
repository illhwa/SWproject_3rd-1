const { fetchAndStoreStock } = require('../services/alphaService');

const symbols = ['AAPL', 'TSLA', 'MSFT', 'NVDA', 'KO', 'GOOGL', 'AMZN', 'META', 'DIS', 'PEP'];

function updateStocks() {
  symbols.forEach(symbol => {
    fetchAndStoreStock(symbol);
  });
}

// 5분마다 실행
setInterval(updateStocks, 5 * 60 * 1000);
console.log('📈 주식 정보 수집기 실행 중...');
