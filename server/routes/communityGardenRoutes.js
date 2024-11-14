// routes/communityGardenRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get All Community Gardens
router.get('/', (req, res) => {
    db.query('SELECT * FROM CommunityGardens', (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send(results);
        }
    });
});

// Add New Community Garden
router.post('/', (req, res) => {
    const { location, crop_type, yield_amount, harvest_date } = req.body;
    const sql = 'INSERT INTO CommunityGardens (location, crop_type, yield_amount, harvest_date) VALUES (?, ?, ?, ?)';
    db.query(sql, [location, crop_type, yield_amount, harvest_date], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.status(201).send({ message: 'Community garden added successfully', gardenId: result.insertId });
        }
    });
});

// Update Community Garden
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { location, crop_type, yield_amount, harvest_date } = req.body;
    const sql = 'UPDATE CommunityGardens SET location = ?, crop_type = ?, yield_amount = ?, harvest_date = ? WHERE garden_id = ?';
    db.query(sql, [location, crop_type, yield_amount, harvest_date, id], (err) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send({ message: 'Community garden updated successfully' });
        }
    });
});

// Delete Community Garden
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM CommunityGardens WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send({ message: 'Community garden deleted successfully' });
        }
    });
});

module.exports = router;
