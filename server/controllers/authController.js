// server/controllers/authController.js
const { User } = require('../models'); // Sequelize User model

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = await User.create({ name, email, password, role });

    // Return success response
    return res.status(201).json({ message: 'Signup successful', user: newUser });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
