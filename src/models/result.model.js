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
    corrects: {
      type: Sequelize.ARRAY(Sequelize.BIGINT),
      defaultValue: [],
      allowNull: false,
    },
    incorrects: {
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
//       console.log("Sync Results Table success!");
//     })
//     .catch((err) => {
//       console.log("Sync Results Table fail!");
//       console.log(err);
//     });
// })();

module.exports = Result;
