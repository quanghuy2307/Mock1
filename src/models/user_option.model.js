const sequelize = require("../configs/db.config");
const { Sequelize } = require("sequelize");

const UserOption = sequelize.define(
  "UserOption",
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
    option_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    is_choice: {
      type: Sequelize.BOOLEAN, // yes/no
      defaultValue: "no",
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
    console.log("Sync UserOptions Table success!");
  });
})().catch((err) => {
  console.log("Sync UserOptions Table fail!");
  console.log(err);
});

module.exports = UserOption;
