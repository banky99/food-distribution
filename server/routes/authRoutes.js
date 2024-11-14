const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Assuming you're using MySQL
const SECRET_KEY = 'your_secret_key';


// Signup Route
router.post('/signup', async (req, res) => {
    const { userType, name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    let insertQuery = '';
    if (userType === 'beneficiary') {
        insertQuery = 'INSERT INTO Beneficiaries (name, email, password) VALUES (?, ?, ?)';
    } else if (userType === 'donor') {
        insertQuery = 'INSERT INTO Donors (name, email, password) VALUES (?, ?, ?)';
    } else if (userType === 'volunteer') {
        insertQuery = 'INSERT INTO Volunteers (name, email, password) VALUES (?, ?, ?)';
    } else {
        return res.status(400).send({ error: 'Invalid user type' });
    }

    db.query(insertQuery, [name, email, hashedPassword], (err) => {
        if (err) return res.status(500).send({ error: 'Database error' });
        res.status(201).send({ message: 'Signup successful' });
    });
});

// Login Route
router.post('/login', async (req, res) => {
    const { userType, email, password } = req.body;
    const table = userType === 'admin' ? 'Admins' : userType === 'beneficiary' ? 'Beneficiaries' : userType === 'donor' ? 'Donors' : 'Volunteers';
    
    const sql = `SELECT * FROM ${table} WHERE email = ?`;
    db.query(sql, [email], async (err, results) => {
        if (err || results.length === 0) return res.status(404).send({ error: 'User  not found' });

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return res.status(401).send({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, userType }, SECRET_KEY, { expiresIn: '1h' });
        res.send({ message: 'Login successful', token });
    });
});

// Password Update Route
router.post('/update-password', async (req, res) => {
    const { userType, email, oldPassword, newPassword } = req.body;
    const table = userType === 'admin' ? 'Admins' : userType === 'beneficiary' ? 'Beneficiaries' : userType === 'donor' ? 'Donors' : 'Volunteers';

    const sql = `SELECT * FROM ${table} WHERE email = ?`;
    db.query(sql, [email], async (err, results) => {
        if (err || results.length === 0) return res.status(404).send({ error: 'User  not found' });

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordValid) return res.status(401).send({ error: 'Old password is incorrect' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updateSql = `UPDATE ${table} SET password = ? WHERE email = ?`;

        db.query(updateSql, [hashedPassword, email], (err) => {
            if (err) return res.status(500).send({ error: 'Database error' });
            res.send({ message: 'Password updated successfully' });
        });
    });
});

module.exports = router;