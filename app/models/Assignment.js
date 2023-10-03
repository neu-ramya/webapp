const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");
const Account = require("../models/Account");

const Assignment = sequelize.define(
  "Assignment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    account_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Account,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
        max: 10,
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
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    assignment_updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Assignment;
