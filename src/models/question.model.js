const sequelize = require("../configs/db.config");
const { Sequelize } = require("sequelize");
const { Answer } = require("./index");

const Question = sequelize.define(
  "Question",
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    question: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
    },
    options: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      defaultValue: [],
      allowNull: false,
    },
    answers: {
      type: Sequelize.ARRAY(Sequelize.BIGINT),
      defaultValue: [],
      allowNull: false,
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
Question.hasOne(Answer, {
  foreignKey: "question_id",
});
Answer.belongsTo(Question, {
  foreignKey: "question_id",
  targetKey: "id",
});

// (async () => {
//   await sequelize
//     .sync({})
//     .then(() => {
//       console.log("Sync Questions Table success!");
//     })
//     .catch((err) => {
//       console.log("Sync Questions Table fail!");
//       console.log(err);
//     });
// })();

module.exports = Question;
