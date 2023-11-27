const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");
const Account = require("../models/Account");
const Assignment = require("../models/Assignment");

const Submission = sequelize.define(
  "Submissions",
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
    assignment_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Assignment,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    submission_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    submission_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    submission_updated: {
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

module.exports = Submission;
