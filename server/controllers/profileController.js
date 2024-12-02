const bcrypt = require('bcrypt');
const db = require('../sequelize'); 

// Update Profile
const updateProfile = async (req, res) => {
  const { name, email, location, food_preferences } = req.body;
  const userId = req.session.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized. Please log in.' });
  }

  try {
    // Log the SQL query and parameters for debugging
    console.log('SQL Query:', 'UPDATE Beneficiaries SET name = ?, email = ?, location = ?, food_preferences = ? WHERE beneficiary_id = ?');
    console.log('Parameters:', [name, email, location, food_preferences, userId]);

    const result = await db.query(
      'UPDATE Beneficiaries SET name = ?, email = ?, location = ?, food_preferences = ? WHERE beneficiary_id = ?',
      [name, email, location, food_preferences, userId]
    );
    res.status(200).json({ message: 'Profile updated successfully!' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile.' });
  }
};

// Update Password
const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.session.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized. Please log in.' });
  }

  try {
    // Log the SQL query and parameters for debugging
    console.log('SQL Query:', 'SELECT password FROM Beneficiaries WHERE beneficiary_id = ?');
    console.log('Parameters:', [userId]);

    const user = await db.query('SELECT password FROM Beneficiaries WHERE beneficiary_id = ?', [userId]);
    if (!user[0]) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Old password is incorrect.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Log the SQL query and parameters for debugging
    console.log('SQL Query:', 'UPDATE Beneficiaries SET password = ? WHERE beneficiary_id = ?');
    console.log('Parameters:', [hashedPassword, userId]);

    await db.query('UPDATE Beneficiaries SET password = ? WHERE beneficiary_id = ?', [hashedPassword, userId]);

    res.status(200).json({ message: 'Password updated successfully!' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Failed to update password.' });
  }
};

module.exports = {
  updateProfile,
  updatePassword,
};
