const db = require('../sequelize');

// Fetch available food from FoodInventory
const getAvailableFood = async (req, res) => {
  try {
    const foodItems = await db.query(
      'SELECT food_type FROM FoodInventory WHERE quantity > 0', // Only show food with available quantity
      { type: db.QueryTypes.SELECT }
    );
    res.status(200).json(foodItems);
  } catch (error) {
    console.error('Error fetching food inventory:', error);
    res.status(500).json({ error: 'Failed to fetch food inventory.' });
  }
};

module.exports = { getAvailableFood };
