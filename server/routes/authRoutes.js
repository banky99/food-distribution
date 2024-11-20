const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const SECRET_KEY = process.env.SECRET_KEY ;
const User = require('../models/User');
const authenticate = require('../Middleware/authenticate');
const session = require('express-session');

// Helper function to determine the table based on userType
const getUserTable = (userType) => {
    switch (userType) {
        case 'admin':
            return 'Admins';
        case 'beneficiary':
            return 'Beneficiaries';
        case 'donor':
            return 'Donors';
        case 'volunteer':
            return 'Volunteers';
        default:
            throw new Error('Invalid user type');
    }
};

// Signup Route
router.post('/signup', async (req, res) => {
    const { userType, name, email, password } = req.body;

    // Check if all fields are provided
    if (!userType || !name || !email || !password) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Determine the table based on userType
    let insertQuery;
    try {
        const table = getUserTable(userType);
        insertQuery = `INSERT INTO ${table} (name, email, password) VALUES (?, ?, ?)`;
    } catch (err) {
        return res.status(400).send({ error: err.message });
    }

    // Insert the new user into the correct table
    db.query(insertQuery, [name, email, hashedPassword], (err) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({ error: 'Database error' });
        }
        res.status(201).send({ message: 'Signup successful' });
    });
});

// Login Route
router.post('/login', async (req, res) => {
    const { userType, email, password } = req.body;

    // Ensure all necessary fields are provided
    if (!userType || !email || !password) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    try {
        const table = getUserTable(userType);
        const sql = `SELECT * FROM ${table} WHERE email = ?`;
        db.query(sql, [email], async (err, results) => {
            if (err || results.length === 0) {
                return res.status(404).send({ error: 'User not found' });
            }

            const user = results[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).send({ error: 'Invalid credentials' });
            }

            // Generate a JWT token
            const token = jwt.sign({ id: user.id, userType }, SECRET_KEY, { expiresIn: '2h' });
            res.send({ message: 'Login successful', token });
        });
    } catch (err) {
        return res.status(400).send({ error: err.message });
    }
});

// Password Update Route
router.post('/update-password', async (req, res) => {
    const { userType, email, oldPassword, newPassword } = req.body;

    // Ensure all fields are provided
    if (!userType || !email || !oldPassword || !newPassword) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    try {
        const table = getUserTable(userType);
        const sql = `SELECT * FROM ${table} WHERE email = ?`;
        db.query(sql, [email], async (err, results) => {
            if (err || results.length === 0) {
                return res.status(404).send({ error: 'User not found' });
            }

            const user = results[0];
            const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

            if (!isPasswordValid) {
                return res.status(401).send({ error: 'Old password is incorrect' });
            }

            // Hash the new password and update it in the database
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const updateSql = `UPDATE ${table} SET password = ? WHERE email = ?`;

            db.query(updateSql, [hashedPassword, email], (err) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).send({ error: 'Database error' });
                }
                res.send({ message: 'Password updated successfully' });
            });
        });
    } catch (err) {
        return res.status(400).send({ error: err.message });
    }
});

// Profile Route
router.get('/profile', authenticate, (req, res) => {
    const { userType, id } = req.user;
    const sql = `SELECT * FROM ${userType} WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send({ error: 'Profile error' });
        res.send(result);
    });
});

// Profile Update Route
router.put('/update-profile', authenticate, (req, res) => {
    const { userType, name, email, location, food_preferences } = req.body;
    if (!name || !email || !location || !food_preferences) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    const updateSql = `UPDATE ?? SET name = ?, email = ?, location = ?, food_preferences = ? WHERE id = ?`;
    db.query(updateSql, [userType, name, email, location, food_preferences, req.user.id], (err) => {
        if (err) return res.status(500).send({ error: 'Profile update failed' });
        res.send({ message: 'Profile updated successfully' });
    });
});

// Food Request Route
router.post('auth/request-food', authenticate, (req, res) => {
    const { food_type, quantity, request_date, status } = req.body;
    const beneficiary_id = req.user.id; // User data should now be available from middleware

    const sql = `INSERT INTO foodrequests (beneficiary_id, food_type, quantity, request_date, status) VALUES (?, ?, ?, ?, ?)`;
    db.query(
        sql,
        [beneficiary_id, food_type, quantity, request_date, status],
        (err, result) => {
            if (err) return res.status(500).send({ error: 'Database error' });
            res.status(201).send({ message: 'Request submitted', request_id: result.insertId });
        }
    );
});

module.exports = router;
