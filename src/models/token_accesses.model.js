const sequelize = require("../configs/db.config");
const { DataTypes } = require("sequelize");

const TokenAccesses = sequelize.define(
  "TokenAccesses",
  {
    tokenAccessesId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tokenRefreshId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {}
);

module.exports = TokenAccesses;
