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
    const { inventory_id, beneficiary_id, volunteer_id, delivery_date, status } = req.body;

    const checkForeignKeys = `
        SELECT 
            (SELECT COUNT(*) FROM foodinventory WHERE inventory_id = ?) AS inventoryExists,
            (SELECT COUNT(*) FROM beneficiaries WHERE beneficiary_id = ?) AS beneficiaryExists,
            (SELECT COUNT(*) FROM volunteers WHERE volunteer_id = ?) AS volunteerExists
    `;

    db.query(checkForeignKeys, [inventory_id, beneficiary_id, volunteer_id], (err, results) => {
        if (err) {
            return res.status(500).send({ error: 'Database error' });
        }

        const { inventoryExists, beneficiaryExists, volunteerExists } = results[0];
        if (!inventoryExists) {
            return res.status(400).send({ error: 'Invalid inventory_id' });
        }
        if (!beneficiaryExists) {
            return res.status(400).send({ error: 'Invalid beneficiary_id' });
        }
        if (!volunteerExists) {
            return res.status(400).send({ error: 'Invalid volunteer_id' });
        }

        const sql = 'INSERT INTO Deliveries (inventory_id, beneficiary_id, volunteer_id, delivery_date, status) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [inventory_id, beneficiary_id, volunteer_id, delivery_date, status], (err, result) => {
            if (err) {
                return res.status(500).send({ error: 'Database error' });
            }
            res.status(201).send({ message: 'Delivery added successfully', deliveryId: result.insertId });
        });
    });
});

module.exports = router;
