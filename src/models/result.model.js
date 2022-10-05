const sequelize = require("../configs/db.config");
const { Sequelize } = require("sequelize");

/* Người dùng khi đăng ký sẽ tạo ra bảng này */
const Result = sequelize.define(
  "Result",
  {
    user_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    correct: {
      type: Sequelize.BIGINT,
      defaultValue: 0,
      allowNull: false,
    },
    incorrect: {
      type: Sequelize.BIGINT,
      defaultValue: 0,
      allowNull: false,
    },
    no_answer: {
      type: Sequelize.BIGINT,
      defaultValue: 0,
      allowNull: false,
    },
    total: {
      type: Sequelize.BIGINT,
      defaultValue: 0,
      allowNull: false,
    },
    score: {
      type: Sequelize.BIGINT,
      defaultValue: 0,
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
    console.log("Sync Results Table success!");
  });
})().catch((err) => {
  console.log("Sync Results Table fail!");
  console.log(err);
});

module.exports = Result;
