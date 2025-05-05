const fs = require('fs');
const path = require('path');

// CSV 파일에서 종목 코드 리스트 읽기
function getStockSymbols(limit = 10) {
  const filePath = path.join(__dirname, '../data/symbols.csv');

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const lines = data.split('\n').map(line => line.trim()).filter(Boolean);
    return lines.slice(0, limit); // 원하는 개수만큼 자르기
  } catch (err) {
    console.error('종목 리스트 읽기 실패:', err);
    return [];
  }
}

module.exports = { getStockSymbols };
