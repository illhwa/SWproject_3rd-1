const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');
const { authenticateToken } = require('../middleware/authMiddleware');

// ✅ 설문 저장 (URL: /api/survey)
router.post('/', authenticateToken, surveyController.submitSurvey);

// ✅ 주식 추천 (URL: /api/survey/recommendations)
router.get('/recommendations', authenticateToken, surveyController.getRecommendations);

module.exports = router;