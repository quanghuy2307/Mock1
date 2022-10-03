const sequelize = require("../configs/db.config");
const { DataTypes } = require("sequelize");

const Questions = sequelize.define(
  "Questions",
  {
    questionId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    score: {
      type: DataTypes.BIGINT,
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

module.exports = Questions;
