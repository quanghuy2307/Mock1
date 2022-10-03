const sequelize = require("../configs/db.config");
const { DataTypes } = require("sequelize");

const Options = sequelize.define(
  "Options",
  {
    optionId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN, // true/false
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {}
);

module.exports = Options;
