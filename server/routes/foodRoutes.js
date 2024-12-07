const express = require('express');
const { getAvailableFood } = require('../controllers/foodController');
const router = express.Router();

router.get('/available-food', getAvailableFood);

module.exports = router;
