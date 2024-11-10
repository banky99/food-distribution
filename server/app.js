const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3002;  // Set the default to 3001

// DEFINE ROUTE for each entity
const donorRoutes = require('./routes/donorRoutes');
const beneficiaryRoutes = require('./routes/beneficiaryRoutes');
const foodInventoryRoutes = require('./routes/foodInventoryRoutes');
const distributionCenterRoutes = require('./routes/distributionCenterRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const foodRequestRoutes = require('./routes/foodRequestRoutes');
const communityGardenRoutes = require('./routes/communityGardenRoutes');

// Middleware
app.use(cors());
app.use(express.json());


// USE ROUTE for each entity
app.use('/donors', donorRoutes);
app.use('/beneficiaries', beneficiaryRoutes);
app.use('/food-inventory', foodInventoryRoutes);
app.use('/distribution-centers', distributionCenterRoutes);
app.use('/deliveries', deliveryRoutes);
app.use('/volunteers', volunteerRoutes);
app.use('/food-requests', foodRequestRoutes);
app.use('/community-gardens', communityGardenRoutes);



app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
