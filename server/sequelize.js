const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,     
  process.env.DB_USER,     
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,   
    dialect: 'mysql',            
    logging: false,              
    pool: {
      max: 5,                    
      min: 0,                    
      acquire: 30000,            
      idle: 10000,               
    },
  }
);

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL using Sequelize');
  } catch (error) {
    console.error('Unable to connect to MySQL using Sequelize:', error.message);
  }
})();

module.exports = sequelize;
