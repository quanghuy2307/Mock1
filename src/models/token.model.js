const sequelize = require("../configs/db.config");
const { Sequelize } = require("sequelize");

/**
 *
 */
const Token = sequelize.define(
  "Token",
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    value: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    type: {
      type: Sequelize.ENUM("access_token", "refresh_token"),
      defaultValue: "access",
      allowNull: false,
    },
    expired_in: {
      type: Sequelize.BIGINT,
      defaultValue: 0,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("NOW"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Token;
