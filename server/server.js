// server/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store); 
const sequelize = require('./sequelize');  

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000; 

// Middleware
app.use(
  cors({
    origin: [
      'http://localhost:3000',
    ], // Frontend origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
  })
);

app.use(bodyParser.json({ limit: '1mb' })); ts
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true })); 

// Sequelize Store for Session Management
const sessionStore = new SequelizeStore({
  db: sequelize,  
});

// Sync the session store with the database
sessionStore.sync().catch((err) =>
  console.error('Failed to sync session store:', err)
);

// Configure session
app.use(
  session({
    key: 'user_session',
    secret: process.env.SESSION_SECRET,  
    resave: false,                      
    saveUninitialized: false,           
    store: sessionStore,                
    cookie: {
      httpOnly: true,                   
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,      
      sameSite: 'lax',                 
    },
  })
);

// Check session route for debugging
app.get('/check-session', (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).json({ loggedIn: true, user: req.session.user });
  } else {
    res.status(401).json({ error: 'Session expired or unauthorized' });
  }
});



// Load all routes
const donorRoutes = require('./routes/donorRoutes');
const beneficiaryRoutes = require('./routes/beneficiaryRoutes');
const foodInventoryRoutes = require('./routes/foodInventoryRoutes');
const distributionCenterRoutes = require('./routes/distributionCenterRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const foodRequestRoutes = require('./routes/foodRequestRoutes');
const communityGardenRoutes = require('./routes/communityGardenRoutes');
const authRoutes = require('./routes/authRoutes'); 

// Use routes for each entity
app.use('/auth', authRoutes);  
app.use('/donors', donorRoutes);
app.use('/beneficiaries', beneficiaryRoutes);
app.use('/food-inventory', foodInventoryRoutes);
app.use('/distribution-centers', distributionCenterRoutes);
app.use('/deliveries', deliveryRoutes);
app.use('/volunteers', volunteerRoutes);
app.use('/request-food', foodRequestRoutes);
app.use('/community-gardens', communityGardenRoutes);

// Default route for health check
app.get('/', (req, res) => {
  res.send('Community Food Network API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

const http = require('http');
const server = http.createServer(app);

server.maxHeadersCount = 1000; 
// Start server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
