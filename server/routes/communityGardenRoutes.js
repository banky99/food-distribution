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
    const { name, location, capacity } = req.body;
    const sql = 'INSERT INTO CommunityGardens (name, location, capacity) VALUES (?, ?, ?)';
    db.query(sql, [name, location, capacity], (err, result) => {
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
    const { name, location, capacity } = req.body;
    const sql = 'UPDATE CommunityGardens SET name = ?, location = ?, capacity = ? WHERE id = ?';
    db.query(sql, [name, location, capacity, id], (err) => {
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
