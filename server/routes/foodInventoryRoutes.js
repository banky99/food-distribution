// routes/foodInventoryRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get All Food Items
router.get('/', (req, res) => {
    db.query('SELECT * FROM FoodInventory', (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send(results);
        }
    });
});

// Add New Food Item
router.post('/', (req, res) => {
    const { name, quantity, expiry_date } = req.body;
    const sql = 'INSERT INTO FoodInventory (name, quantity, expiry_date) VALUES (?, ?, ?)';
    db.query(sql, [name, quantity, expiry_date], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.status(201).send({ message: 'Food item added successfully', foodItemId: result.insertId });
        }
    });
});

// Update Food Item
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, quantity, expiry_date } = req.body;
    const sql = 'UPDATE FoodInventory SET name = ?, quantity = ?, expiry_date = ? WHERE id = ?';
    db.query(sql, [name, quantity, expiry_date, id], (err) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send({ message: 'Food item updated successfully' });
        }
    });
});

// Delete Food Item
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM FoodInventory WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send({ message: 'Food item deleted successfully' });
        }
    });
});

module.exports = router;
