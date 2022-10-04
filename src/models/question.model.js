const sequelize = require("../configs/db.config");
const { Sequelize } = require("sequelize");
const { Option, UserQuestion, UserOption } = require("./index");

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
    score: {
      type: Sequelize.BIGINT,
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

/*  */
Question.hasMany(Option, {
  foreignKey: "question_id",
});
Option.belongsTo(Question, {
  foreignKey: "question_id",
  targetKey: "id",
});

/*  */
Question.hasMany(UserQuestion, {
  foreignKey: "question_id",
});
UserQuestion.belongsTo(Question, {
  foreignKey: "question_id",
  targetKey: "id",
});

/*  */
Question.hasMany(UserOption, {
  foreignKey: "question_id",
});
UserOption.belongsTo(Question, {
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
