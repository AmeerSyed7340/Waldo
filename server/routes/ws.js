// routes/game.js or routes/ws.js

const express = require('express');
const router = express.Router();
const websocketController = require('../controllers/websocketController');

// This assumes express-ws has been applied to your Express app instance in app.js
router.ws('/timer', (ws, req) => {
    websocketController.setupWebSocket(ws);
});

module.exports = router;
