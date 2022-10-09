const sequelize = require("../configs/db.config");
const { Sequelize } = require("sequelize");

/* Người dùng khi trả lời sẽ tạo ra bảng này */
const Answer = sequelize.define(
  "Answer",
  {
    user_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    question_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    choices: {
      type: Sequelize.ARRAY(Sequelize.BIGINT),
      defaultValue: [],
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

// (async () => {
//   await sequelize
//     .sync({})
//     .then(() => {
//       console.log("Sync Answers Table success!");
//     })
//     .catch((err) => {
//       console.log("Sync Answers Table fail!");
//       console.log(err);
//     });
// })();

module.exports = Answer;
