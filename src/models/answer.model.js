const sequelize = require("../configs/db.config");
const { Sequelize } = require("sequelize");

/**
 *
 */
const Answer = sequelize.define(
  "Answer",
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
    question_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    choices: {
      type: Sequelize.ARRAY(Sequelize.BIGINT),
      defaultValue: [],
      allowNull: false,
    },
    turn: {
      type: Sequelize.BIGINT,
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

module.exports = Answer;
