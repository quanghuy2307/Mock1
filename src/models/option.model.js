const sequelize = require("../configs/db.config");
const { Sequelize } = require("sequelize");
const { Answer } = require("./index");

const Option = sequelize.define(
  "Option",
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    question_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    is_true: {
      type: Sequelize.BOOLEAN, // yes/no
      defaultValue: "no",
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["question_id", "content"],
      },
    ],
    timestamps: false,
  }
);

/*  */
Option.hasMany(Answer, {
  foreignKey: "option_id",
});
Answer.belongsTo(Option, {
  foreignKey: "option_id",
  targetKey: "id",
});

(async function () {
  await sequelize.sync(/*{ alter: true }*/).then(() => {
    console.log("Sync Options Table success!");
  });
})().catch((err) => {
  console.log("Sync Options Table fail!");
  console.log(err);
});

module.exports = Option;
