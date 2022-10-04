const sequelize = require("../configs/db.config");
const { DataTypes } = require("sequelize");

const Result = sequelize.define(
  "Result",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    correct: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: false,
    },
    incorrect: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: false,
    },
    no_answer: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: false,
    },
    total: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: false,
    },
    score: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

(async function () {
  await sequelize.sync(/*{ alter: true }*/).then(() => {
    console.log("Sync Results Table success!");
  });
})().catch((err) => {
  console.log("Sync Results Table fail!");
  console.log(err);
});

module.exports = Result;
