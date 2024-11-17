const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name
  process.env.DB_USER,     // Database username
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Set to true if you want to see SQL queries in the console
  }
);

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL using Sequelize');
  } catch (error) {
    console.error('Unable to connect to MySQL using Sequelize:', error);
  }
})();

module.exports = sequelize;
