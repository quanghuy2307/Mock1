const sequelize = require("../configs/db.config");
const { Sequelize } = require("sequelize");

/**
 *
 */
const Result = sequelize.define(
  "Result",
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
    turn: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    total: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    total_correct: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    total_incorrect: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    corrects: {
      type: Sequelize.ARRAY(Sequelize.BIGINT),
      defaultValue: [],
      allowNull: false,
    },
    incorrects: {
      type: Sequelize.ARRAY(Sequelize.BIGINT),
      defaultValue: [],
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

module.exports = Result;
