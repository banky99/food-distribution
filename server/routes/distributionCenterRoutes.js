// routes/distributionCenterRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get All Distribution Centers
router.get('/', (req, res) => {
    db.query('SELECT * FROM DistributionCenters', (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send(results);
        }
    });
});

// Add New Distribution Center
router.post('/', (req, res) => {
    const { name, location, capacity } = req.body;
    const sql = 'INSERT INTO DistributionCenters (name, location, capacity) VALUES (?, ?, ?)';
    db.query(sql, [name, location, capacity], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.status(201).send({ message: 'Distribution center added successfully', centerId: result.insertId });
        }
    });
});

// Update Distribution Center
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, location, capacity } = req.body;
    const sql = 'UPDATE DistributionCenters SET name = ?, location = ?, capacity = ? WHERE id = ?';
    db.query(sql, [name, location, capacity, id], (err) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send({ message: 'Distribution center updated successfully' });
        }
    });
});

// Delete Distribution Center
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM DistributionCenters WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send({ message: 'Distribution center deleted successfully' });
        }
    });
});

module.exports = router;
