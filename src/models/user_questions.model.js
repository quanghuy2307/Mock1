const sequelize = require("../configs/db.config");
const { DataTypes } = require("sequelize");

const UserQuestions = sequelize.define(
  "UserQuestions",
  {
    userQuestionId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING, // True/False/None
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

module.exports = UserQuestions;
