const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const stockController = require('../controllers/stockController');

router.get('/recommend', authenticateToken, stockController.getRecommendedStocks);

module.exports = router;
