// server/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3002; // Set the default to 3002

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Use body-parser to parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded data

// Load all routes
const donorRoutes = require('./routes/donorRoutes');
const beneficiaryRoutes = require('./routes/beneficiaryRoutes');
const foodInventoryRoutes = require('./routes/foodInventoryRoutes');
const distributionCenterRoutes = require('./routes/distributionCenterRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const foodRequestRoutes = require('./routes/foodRequestRoutes');
const communityGardenRoutes = require('./routes/communityGardenRoutes');
const authRoutes = require('./routes/authRoutes'); // New Authentication Routes

// Use routes for each entity
app.use('/api/auth', authRoutes); // Authentication Routes
app.use('/donors', donorRoutes);
app.use('/beneficiaries', beneficiaryRoutes);
app.use('/food-inventory', foodInventoryRoutes);
app.use('/distribution-centers', distributionCenterRoutes);
app.use('/deliveries', deliveryRoutes);
app.use('/volunteers', volunteerRoutes);
app.use('/food-requests', foodRequestRoutes);
app.use('/community-gardens', communityGardenRoutes);

// Default route for health check
app.get('/', (req, res) => {
  res.send('Community Food Network API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
