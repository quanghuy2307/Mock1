const sequelize = require("../configs/db.config");
const { DataTypes } = require("sequelize");
const Option = require("./option.model");
const UserQuestion = require("./user_question.model");
const UserOption = require("./user_option.model");

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
Question.hasMany(UserQuestion, {
  foreignKey: "question_id",
});
Question.hasMany(UserOption, {
  foreignKey: "question_id",
});

module.exports = Question;
