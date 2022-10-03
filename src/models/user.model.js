const sequelize = require("../configs/db.config");
const { DataTypes } = require("sequelize");

const Users = sequelize.define(
  "Users",
  {
    userId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING, // Male/Female/Others
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    hashedPassword: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {}
);

module.exports = Users;
