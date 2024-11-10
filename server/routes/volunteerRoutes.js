// routes/volunteerRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get All Volunteers
router.get('/', (req, res) => {
    db.query('SELECT * FROM Volunteers', (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send(results);
        }
    });
});

// Add New Volunteer
router.post('/', (req, res) => {
    const { name, contact_info, role } = req.body;
    const sql = 'INSERT INTO Volunteers (name, contact_info, role) VALUES (?, ?, ?)';
    db.query(sql, [name, contact_info, role], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.status(201).send({ message: 'Volunteer added successfully', volunteerId: result.insertId });
        }
    });
});

// Update Volunteer
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, contact_info, role } = req.body;
    const sql = 'UPDATE Volunteers SET name = ?, contact_info = ?, role = ? WHERE id = ?';
    db.query(sql, [name, contact_info, role, id], (err) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send({ message: 'Volunteer updated successfully' });
        }
    });
});

// Delete Volunteer
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Volunteers WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send({ message: 'Volunteer deleted successfully' });
        }
    });
});

module.exports = router;
