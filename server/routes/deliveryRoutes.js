// routes/deliveryRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get All Deliveries
router.get('/', (req, res) => {
    db.query('SELECT * FROM Deliveries', (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send(results);
        }
    });
});

// Add New Delivery
router.post('/', (req, res) => {
    const { food_item_id, beneficiary_id, distribution_center_id, delivery_date } = req.body;
    const sql = 'INSERT INTO Deliveries (food_item_id, beneficiary_id, distribution_center_id, delivery_date) VALUES (?, ?, ?, ?)';
    db.query(sql, [food_item_id, beneficiary_id, distribution_center_id, delivery_date], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.status(201).send({ message: 'Delivery added successfully', deliveryId: result.insertId });
        }
    });
});

// Update Delivery
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { food_item_id, beneficiary_id, distribution_center_id, delivery_date } = req.body;
    const sql = 'UPDATE Deliveries SET food_item_id = ?, beneficiary_id = ?, distribution_center_id = ?, delivery_date = ? WHERE id = ?';
    db.query(sql, [food_item_id, beneficiary_id, distribution_center_id, delivery_date, id], (err) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send({ message: 'Delivery updated successfully' });
        }
    });
});

// Delete Delivery
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Deliveries WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send({ message: 'Delivery deleted successfully' });
        }
    });
});

module.exports = router;
