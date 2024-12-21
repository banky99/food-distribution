// models/Donation.js
module.exports = (sequelize, DataTypes) => {
    const Donation = sequelize.define('Donation', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      donor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      food_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      donationDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  
    // Associations (if needed)
    Donation.associate = (models) => {
      Donation.belongsTo(models.Donor, {
        foreignKey: 'donor_id',
        as: 'donor',
      });
    };
  
    return Donation;
  };
  