const bcrypt = require('bcrypt');
const db = require('./db'); //

const createAdmin = async () => {
  const name = 'festus king';
  const email = 'admin@gmail.com';
  const plainPassword = 'AdminPassword';

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Insert the admin user with the hashed password
    const insertQuery = 'INSERT INTO Admins (name, email, password) VALUES (?, ?, ?)';
    db.query(insertQuery, [name, email, hashedPassword], (err, results) => {
      if (err) {
        console.error('Error creating admin:', err);
      } else {
        console.log('Admin created successfully');
      }
      process.exit(); 
    });
  } catch (error) {
    console.error('Error hashing password:', error);
  }
};

createAdmin();
