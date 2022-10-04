const sequelize = require("../configs/db.config");
const { DataTypes } = require("sequelize");

const Token = sequelize.define(
  "Token",
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("access", "refresh"),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    expired_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

(async function () {
  await sequelize.sync(/*{ alter: true }*/).then(() => {
    console.log("Sync Tokens Table success!");
  });
})().catch((err) => {
  console.log("Sync Tokens Table fail!");
  console.log(err);
});

module.exports = Token;
