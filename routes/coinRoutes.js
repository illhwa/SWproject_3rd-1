const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const { getCoinRecommendations } = require('../controllers/coinController');

// 추천 코인 요청
router.get('/recommendations', authenticateToken, getCoinRecommendations);

module.exports = router;
