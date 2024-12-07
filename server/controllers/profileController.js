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
    // Sequelize's query method requires replacements for parameterized queries
    const result = await db.query(
      'UPDATE Beneficiaries SET name = :name, email = :email, location = :location, food_preferences = :food_preferences WHERE beneficiary_id = :userId',
      {
        replacements: { name, email, location, food_preferences, userId },
        type: db.QueryTypes.UPDATE,
      }
    );

    if (result[1] === 0) { // Check if rows were updated
      return res.status(404).json({ error: 'User not found or no changes made.' });
    }

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
    // Fetch user password
    const [user] = await db.query(
      'SELECT password FROM Beneficiaries WHERE beneficiary_id = :userId',
      {
        replacements: { userId },
        type: db.QueryTypes.SELECT,
      }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Old password is incorrect.' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    const result = await db.query(
      'UPDATE Beneficiaries SET password = :hashedPassword WHERE beneficiary_id = :userId',
      {
        replacements: { hashedPassword, userId },
        type: db.QueryTypes.UPDATE,
      }
    );

    if (result[1] === 0) { // Check if rows were updated
      return res.status(404).json({ error: 'User not found or no changes made.' });
    }

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
