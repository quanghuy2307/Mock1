const sequelize = require("../configs/db.config");
const { DataTypes } = require("sequelize");

const UserOptions = sequelize.define(
  "UserOptions",
  {
    userOptionId: {
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
    optionId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    isChoice: {
      type: DataTypes.BOOLEAN, //true/false
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

module.exports = UserOptions;
