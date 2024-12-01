const express = require('express');
const router = express.Router();
const db = require('../db');

// Middleware to check admin access
const checkAdmin = (req, res, next) => {
    if (req.session.user?.role !== 'admin') {
        return res.status(403).send({ error: 'Forbidden: Admin access required' });
    }
    next();
};

// Get All Food Requests for a Specific Beneficiary (Regular Beneficiary Access)
router.get('/', (req, res) => {
    const beneficiary_id = req.session.user?.id;

    if (!beneficiary_id) {
        console.error('Unauthorized access - missing beneficiary_id');
        return res.status(401).send({ error: 'Unauthorized: Beneficiary ID is missing' });
    }

    const sql = `
        SELECT 
            request_id, 
            food_type, 
            quantity, 
            DATE_FORMAT(request_date, "%Y-%m-%d") AS request_date, 
            status 
        FROM FoodRequests 
        WHERE beneficiary_id = ? 
        ORDER BY request_date DESC`;

    db.query(sql, [beneficiary_id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({ error: 'Database error', details: err.message });
        }

        console.log('Fetched food requests for beneficiary_id:', beneficiary_id);
        res.send(results);
    });
});

// Get All Food Requests (Admin Access)
router.get('/all', checkAdmin, (req, res) => {
    const sql = `
        SELECT 
            request_id, 
            beneficiary_id, 
            food_type, 
            quantity, 
            DATE_FORMAT(request_date, "%Y-%m-%d") AS request_date, 
            status 
        FROM FoodRequests 
        ORDER BY request_date DESC`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({ error: 'Database error', details: err.message });
        }

        console.log('Admin fetched all food requests');
        res.send(results);
    });
});

// Add New Food Request
router.post('/', (req, res) => {
    const { food_type, quantity, request_date, status } = req.body;

    // Validate request data
    if (!food_type || !quantity || !request_date || !status) {
        return res.status(400).send({ error: 'All fields are required: food_type, quantity, request_date, and status' });
    }

    const beneficiary_id = req.session.user?.id;

    if (!beneficiary_id) {
        console.error('Unauthorized access - missing beneficiary_id');
        return res.status(401).send({ error: 'Unauthorized: Beneficiary ID is missing' });
    }

    console.log('Creating food request:', { beneficiary_id, food_type, quantity, request_date, status });

    const sql = 'INSERT INTO FoodRequests (beneficiary_id, food_type, quantity, request_date, status) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [beneficiary_id, food_type, quantity, request_date, status], (err, result) => {
        if (err) {
            console.error('Database error during food request creation:', err.message);
            return res.status(500).send({ error: 'Database error', details: err.message });
        }

        console.log('Food request created successfully with request_id:', result.insertId);
        res.status(201).send({ message: 'Food request added successfully', requestId: result.insertId });
    });
});

// Update Food Request (Admin Access)
router.put('/:id', checkAdmin, (req, res) => {
    const { id } = req.params;
    const { beneficiary_id, food_type, quantity, request_date, status } = req.body;

    // Validate request data
    if (!beneficiary_id || !food_type || !quantity || !request_date || !status) {
        return res.status(400).send({ error: 'All fields are required: beneficiary_id, food_type, quantity, request_date, and status' });
    }

    const sql = `
        UPDATE FoodRequests 
        SET beneficiary_id = ?, food_type = ?, quantity = ?, request_date = ?, status = ? 
        WHERE request_id = ?`;

    db.query(sql, [beneficiary_id, food_type, quantity, request_date, status, id], (err, result) => {
        if (err) {
            console.error('Database error during food request update:', err.message);
            return res.status(500).send({ error: 'Database error', details: err.message });
        }

        console.log(`Food request with request_id ${id} updated successfully`);
        res.send({ message: 'Food request updated successfully' });
    });
});

// Delete Food Request (Admin Access)
router.delete('/:id', checkAdmin, (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM FoodRequests WHERE request_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Database error during food request deletion:', err.message);
            return res.status(500).send({ error: 'Database error', details: err.message });
        }

        console.log(`Food request with request_id ${id} deleted successfully`);
        res.send({ message: 'Food request deleted successfully' });
    });
});

module.exports = router;
