const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function fetchSymbolsFromYahoo() {
  try {
    const res = await axios.get(
      'https://query1.finance.yahoo.com/v1/finance/screener/predefined/saved?scrIds=most_actives&count=100'
    );

    const quotes = res.data.finance.result[0].quotes;
    const symbols = quotes.map((item) => item.symbol);

    const filePath = path.join(__dirname, '../data/symbols.csv');
    fs.writeFileSync(filePath, symbols.join('\n'));
    console.log(`✅ ${symbols.length}개 종목이 symbols.csv에 저장되었습니다.`);
  } catch (error) {
    console.error('❌ 종목 리스트 가져오기 실패:', error.message);
  }
}

fetchSymbolsFromYahoo();
