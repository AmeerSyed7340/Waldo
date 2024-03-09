// routes/game.js or routes/ws.js

const express = require('express');
const router = express.Router();
const websocketController = require('../controllers/websocketController');

router.ws('/timer', websocketController.setupWebSocket);

module.exports = router;
