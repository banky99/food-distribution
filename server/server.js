// server/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./db');
const session = require('express-session');


dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000; // Set the default to 3000

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.56.1:3000','http://172.26.0.1:3000'], // Add both frontend URLs if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  
}));
app.use(bodyParser.json({ limit: '1mb' })); // Use body-parser to parse JSON requests
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true })); // To parse URL-encoded data


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
app.use('/auth', authRoutes); // Authentication Routes
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

//app.listen(PORT, '0.0.0.0', () => {
  //console.log(`Server is running on http://0.0.0.0:${PORT}`);
//});