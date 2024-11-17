// routes/donorRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get All Donors
router.get('/', (req, res) => {
    db.query('SELECT * FROM Donors', (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send(results);
        }
    });
});

// Add New Donor
router.post('/', (req, res) => {
    const { name, contact_info, donation_frequency, preferred_food_types } = req.body;
    const sql = 'INSERT INTO Donors (name, email, donation_frequency, preferred_food_types) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, donation_frequency, preferred_food_types], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.status(201).send({ message: 'Donor added successfully', donorId: result.insertId });
        }
    });
});

module.exports = router;
