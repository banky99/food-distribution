// routes/beneficiaryRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get All Beneficiaries
router.get('/', (req, res) => {
    db.query('SELECT * FROM Beneficiaries', (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send(results);
        }
    });
});

// Add New Beneficiary
router.post('/', (req, res) => {
    const { name, contact_info, location, dietary_restrictions, allergies, food_preferences } = req.body;
    const sql = 'INSERT INTO Beneficiaries (name, contact_info, location, dietary_restrictions, allergies, food_preferences) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, contact_info, location, dietary_restrictions, allergies, food_preferences], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.status(201).send({ message: 'Beneficiary added successfully', beneficiaryId: result.insertId });
        }
    });
});

// Update Beneficiary
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, contact_info, location, dietary_restrictions, allergies, food_preferences } = req.body;
    const sql = 'UPDATE Beneficiaries SET name = ?, contact_info = ?, location = ?, dietary_restrictions = ?, allergies = ?, food_preferences = ? WHERE beneficiary_id = ?';
    db.query(sql, [name, contact_info, location, dietary_restrictions, allergies, food_preferences, id], (err) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send({ message: 'Beneficiary updated successfully' });
        }
    });
});

// Delete Beneficiary
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Beneficiaries WHERE beneficiary_id ?';
    db.query(sql, [id], (err) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send({ message: 'Beneficiary deleted successfully' });
        }
    });
});

module.exports = router;
