const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database'); 

const Assignment = sequelize.define('Assignment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 100,
        },
      },
      num_of_attempts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 100,
        },
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      assignment_created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      assignment_updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
});

module.exports = Assignment;
