const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/', gameController.test);

router.post('/', gameController.extractCoordinates);

module.exports = router;