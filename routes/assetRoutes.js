// routes/assetRoutes.js
const express = require('express');
const router = express.Router();

const { getAssets } = require('../controllers/assetController');
const authenticate = require('../middleware/authMiddleware'); // ✅ 수정된 경로

router.get('/', authenticate, getAssets);

module.exports = router;
