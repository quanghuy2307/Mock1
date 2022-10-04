const sequelize = require("../configs/db.config");
const { DataTypes } = require("sequelize");

const UserQuestion = sequelize.define(
  "UserQuestion",
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
    question_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    answer: {
      type: DataTypes.ENUM("true", "false", "none"), // true/false/none
      defaultValue: "none",
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
    console.log("Sync UserQuestions Table success!");
  });
})().catch((err) => {
  console.log("Sync UserQuestions Table fail!");
  console.log(err);
});

module.exports = UserQuestion;
