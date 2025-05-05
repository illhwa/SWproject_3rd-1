const express = require('express');
const router = express.Router();
const { saveWalletAddress } = require('../controllers/walletController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/wallet', authenticateToken, saveWalletAddress);

module.exports = router;
