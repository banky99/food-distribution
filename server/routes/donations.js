const express = require('express');
const router = express.Router();
const { Donation } = require('../models/Donation'); // Adjust the import to your project structure

// Get donations for the logged-in donor
router.get('/donations', async (req, res) => {
    try {
        const donorId = req.user?.id; // Assuming you're using authentication middleware
        if (!donorId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const donations = await Donation.findAll({ where: { donor_id: donorId } });
        res.json(donations);
    } catch (error) {
        console.error('Error fetching donations:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
