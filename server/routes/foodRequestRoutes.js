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
    const { beneficiary_id, food_type, quantity, request_date, status } = req.body;
    console.log('Request Data:', req.body); // Log the request data
    const sql = 'INSERT INTO FoodRequests (beneficiary_id, food_type, quantity, request_date, status) VALUES (?, ?, ?, ?, ?)';
    
    db.query(sql, [beneficiary_id, food_type, quantity, request_date, status], (err, result) => {
        if (err) {
            console.error('Database error:', err); // Log the actual error
            res.status(500).send({ error: 'Database error', details: err.message });
        } else {
            res.status(201).send({ message: 'Food request added successfully', requestId: result.insertId });
        }
    });
});

// Update Food Request
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { beneficiary_id, food_type, quantity, request_date, status } = req.body;
    const sql = 'UPDATE FoodRequests SET beneficiary_id = ?, food_type = ?, quantity = ?, request_date = ?, status = ? WHERE request_id = ?';
    db.query(sql, [beneficiary_id, food_type, quantity, request_date, status, id], (err) => {
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
    const sql = 'DELETE FROM FoodRequests WHERE request_id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send({ message: 'Food request deleted successfully' });
        }
    });
});

module.exports = router;
