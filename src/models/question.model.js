const sequelize = require("../configs/db.config");
const { DataTypes } = require("sequelize");
const { Option, UserQuestion, UserOption } = require("./index");

const Question = sequelize.define(
  "Question",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    score: {
      type: DataTypes.BIGINT,
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

/*  */
Question.hasMany(Option, {
  foreignKey: "question_id",
});
// Option.belongsTo(Question, {
//   foreignKey: "question_id",
//   targetKey: "id",
// });
Question.hasMany(UserQuestion, {
  foreignKey: "question_id",
});
// UserQuestion.belongsTo(Question, {
//   foreignKey: "question_id",
//   targetKey: "id",
// });
Question.hasMany(UserOption, {
  foreignKey: "question_id",
});
// UserOption.belongsTo(Question, {
//   foreignKey: "question_id",
//   targetKey: "id",
// });

(async function () {
  await sequelize.sync(/*{ alter: true }*/).then(() => {
    console.log("Sync Questions Table success!");
  });
})().catch((err) => {
  console.log("Sync Questions Table fail!");
  console.log(err);
});

module.exports = Question;
