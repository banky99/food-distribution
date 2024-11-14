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
    const { name, availability, roles, contact_info } = req.body;
    const sql = 'INSERT INTO Volunteers (name, availability, roles, contact_info) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, availability, roles, contact_info], (err, result) => {
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
    const { name, availability, roles, contact_info } = req.body;
    const sql = 'UPDATE Volunteers SET name = ?, availability = ?, roles = ?, contact_info = ? WHERE volunteer_id = ?';
    db.query(sql, [name, availability, roles, contact_info, id], (err) => {
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
    const sql = 'DELETE FROM Volunteers WHERE volunteer_id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send({ message: 'Volunteer deleted successfully' });
        }
    });
});

module.exports = router;
