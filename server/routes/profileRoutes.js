const express = require('express');
const router = express.Router();

// Controller imports
const { updateProfile, updatePassword } = require('../controllers/profileController');

// Routes for profile actions
router.put('/update-profile', updateProfile);
router.post('/update-password', updatePassword);

module.exports = router;
