const express = require('express')
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');

router.get('/', leaderboardController.allUsers);

module.exports = router;