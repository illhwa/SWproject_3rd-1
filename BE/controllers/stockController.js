const db = require('../models/db');

exports.getRecommendedStocks = (req, res) => {
  const userId = req.user.userId;

  const surveySql = 'SELECT * FROM survey_results WHERE user_id = ? ORDER BY created_at DESC LIMIT 1';
  db.query(surveySql, [userId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: '설문 결과가 없습니다.' });
    }

    const { risk_tolerance } = results[0];

    let orderClause = '';
    if (risk_tolerance === '공격형') {
      orderClause = 'ORDER BY change_percent DESC';
    } else if (risk_tolerance === '안정형') {
      orderClause = 'ORDER BY ABS(change_percent) ASC';
    } else {
      orderClause = 'ORDER BY ABS(change_percent) ASC';
    }

    const sql = `SELECT * FROM stocks ${orderClause} LIMIT 10`;
    db.query(sql, (err, rows) => {
      if (err) return res.status(500).json({ message: '추천 주식 조회 실패' });
      res.status(200).json({ message: '추천 주식 목록', recommendations: rows });
    });
  });
};
