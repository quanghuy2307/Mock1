const sequelize = require("../configs/db.config");
const { Sequelize } = require("sequelize");

/* Người dùng khi đăng ký sẽ tạo ra bảng này */
const RefreshToken = sequelize.define(
  "RefreshToken",
  {
    user_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      defaultValue: "",
      allowNull: false,
    },
    expired_in: {
      type: Sequelize.STRING,
      defaultValue: "",
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

(async function () {
  await sequelize.sync(/*{ alter: true }*/).then(() => {
    console.log("Sync RefreshTokens Table success!");
  });
})().catch((err) => {
  console.log("Sync RefreshTokens Table fail!");
  console.log(err);
});

module.exports = RefreshToken;
