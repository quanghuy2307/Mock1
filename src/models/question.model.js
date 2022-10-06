const sequelize = require("../configs/db.config");
const { Sequelize } = require("sequelize");
const { Option, Answer } = require("./index");

const Question = sequelize.define(
  "Question",
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("NOW"),
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

/*  */
Question.hasMany(Option, {
  foreignKey: "question_id",
});
Option.belongsTo(Question, {
  foreignKey: "question_id",
  targetKey: "id",
});

/*  */
Question.hasMany(Answer, {
  foreignKey: "question_id",
});
Answer.belongsTo(Question, {
  foreignKey: "question_id",
  targetKey: "id",
});

(async function () {
  await sequelize.sync(/*{ alter: true }*/).then(() => {
    console.log("Sync Questions Table success!");
  });
})().catch((err) => {
  console.log("Sync Questions Table fail!");
  console.log(err);
});

module.exports = Question;
