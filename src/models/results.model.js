const sequelize = require("../configs/db.config");
const { DataTypes } = require("sequelize");

const Results = sequelize.define(
  "Results",
  {
    resultId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    correct: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    incorrect: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    noAnswer: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    total: {
      type: DataTypes.BIGINT,
      allowNull: false,
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

module.exports = Results;
