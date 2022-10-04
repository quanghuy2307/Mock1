const sequelize = require("../configs/db.config");
const { DataTypes } = require("sequelize");

const UserOption = sequelize.define(
  "UserOption",
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
    option_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    is_choice: {
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
    timestamps: false,
  }
);

(async function () {
  await sequelize.sync(/*{ alter: true }*/).then(() => {
    console.log("Sync UserOptions Table success!");
  });
})().catch((err) => {
  console.log("Sync UserOptions Table fail!");
  console.log(err);
});

module.exports = UserOption;
