const sequelize = require("../configs/db.config");
const { Sequelize } = require("sequelize");
const { Result, UserOption, RefreshToken } = require("./index");

/* Người dùng khi đăng ký sẽ tạo ra bảng này */
const User = sequelize.define(
  "User",
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    full_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    birthday: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    sex: {
      type: Sequelize.STRING(6), // Male/Female/Others
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(100),
      unique: true,
      allowNull: false,
    },
    hashed_password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM("user", "admin"), // user/admin
      defaultValue: "user",
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("NOW"),
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

/*  */
User.hasOne(Result, {
  foreignKey: "user_id",
});
Result.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
});

/*  */
User.hasOne(RefreshToken, {
  foreignKey: "user_id",
});
RefreshToken.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
});

/*  */
User.hasMany(UserOption, {
  foreignKey: "user_id",
});
UserOption.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
});

(async function () {
  await sequelize.sync(/*{ alter: true }*/).then(() => {
    console.log("Sync Users Table success!");
  });
})().catch((err) => {
  console.log("Sync Users Table fail!");
  console.log(err);
});

module.exports = User;
