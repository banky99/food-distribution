const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next(); // Session is valid
    } else {
        res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }
};

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

    if (!userType || !name || !email || !password) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const table = getUserTable(userType);
        const insertQuery = `INSERT INTO ${table} (name, email, password) VALUES (?, ?, ?)`;

        db.query(insertQuery, [name, email, hashedPassword], (err) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send({ error: 'Database error' });
            }
            res.status(201).send({ message: 'Signup successful' });
        });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { userType, email, password } = req.body;

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

            // Store user data in session
            req.session.user = {
                id: user.beneficiary_id, // Store beneficiary_id explicitly
                userType,
            };

            // Explicitly save session to handle asynchronous nature
            req.session.save((err) => {
                if (err) {
                    console.error('Error saving session:', err);
                    return res.status(500).send({ error: 'Session save failed' });
                }
                res.send({ message: 'Login successful', user: { id: user.beneficiary_id, userType } });
            });
        });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Logout Route
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).send({ error: 'Failed to log out' });
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.send({ message: 'Logout successful' });
    });
});

// Profile Route
router.get('/profile', isAuthenticated, (req, res) => {
    const { userType, id } = req.session.user; // Use `id` from session
    const table = getUserTable(userType); // Validate table name
    const sql = `SELECT * FROM ${table} WHERE beneficiary_id = ?`; // Match the `beneficiary_id` schema

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Profile fetch error:', err);
            return res.status(500).send({ error: 'Profile fetch failed' });
        }
        if (result.length === 0) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(result[0]);
    });
});



module.exports = router;
