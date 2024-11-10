// routes/foodRequestRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get All Food Requests
router.get('/', (req, res) => {
    db.query('SELECT * FROM FoodRequests', (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send(results);
        }
    });
});

// Add New Food Request
router.post('/', (req, res) => {
    const { beneficiary_id, food_item_id, quantity_requested, request_date } = req.body;
    const sql = 'INSERT INTO FoodRequests (beneficiary_id, food_item_id, quantity_requested, request_date) VALUES (?, ?, ?, ?)';
    db.query(sql, [beneficiary_id, food_item_id, quantity_requested, request_date], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.status(201).send({ message: 'Food request added successfully', requestId: result.insertId });
        }
    });
});

// Update Food Request
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { beneficiary_id, food_item_id, quantity_requested, request_date } = req.body;
    const sql = 'UPDATE FoodRequests SET beneficiary_id = ?, food_item_id = ?, quantity_requested = ?, request_date = ? WHERE id = ?';
    db.query(sql, [beneficiary_id, food_item_id, quantity_requested, request_date, id], (err) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send({ message: 'Food request updated successfully' });
        }
    });
});

// Delete Food Request
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM FoodRequests WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send({ message: 'Food request deleted successfully' });
        }
    });
});

module.exports = router;
