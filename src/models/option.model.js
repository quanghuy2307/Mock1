const sequelize = require("../configs/db.config");
const { DataTypes } = require("sequelize");
const { UserOption } = require("./index");

const Option = sequelize.define(
  "Option",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    question_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_correct: {
      type: DataTypes.BOOLEAN, // yes/no
      defaultValue: "no",
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
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
Option.hasMany(UserOption, {
  foreignKey: "option_id",
});
// UserOption.belongsTo(Option, {
//   foreignKey: "option_id",
//   targetKey: "id",
// });

(async function () {
  await sequelize.sync(/*{ alter: true }*/).then(() => {
    console.log("Sync Options Table success!");
  });
})().catch((err) => {
  console.log("Sync Options Table fail!");
  console.log(err);
});

module.exports = Option;
