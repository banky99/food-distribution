const sequelize = require('./sequelize');
const User = require('./models/User');

(async () => {
  try {
    await sequelize.sync({ force: false }); // Set to true to drop tables before recreating them
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error syncing database:', error);
  } finally {
    await sequelize.close();
  }
})();