const sequelize = require("../configs/db.config");
const { Sequelize } = require("sequelize");

const UserQuestion = sequelize.define(
  "UserQuestion",
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
    answer: {
      type: Sequelize.ENUM("true", "false", "none"), // true/false/none
      defaultValue: "none",
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("NOW"),
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
