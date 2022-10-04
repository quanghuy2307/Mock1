const sequelize = require("../configs/db.config");
const { DataTypes } = require("sequelize");
const { Result, UserQuestion, UserOption, Token } = require("./index");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING(6), // Male/Female/Others
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    hashed_password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"), // user/admin
      defaultValue: "user",
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
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
// Result.belongsTo(User, {
//   foreignKey: "user_id",
//   targetKey: "id",
// });
User.hasMany(Token, {
  foreignKey: "user_id",
});
// Token.belongsTo(User, {
//   foreignKey: "user_id",
//   targetKey: "id",
// });
User.hasMany(UserQuestion, {
  foreignKey: "user_id",
});
// UserQuestion.belongsTo(User, {
//   foreignKey: "user_id",
//   targetKey: "id",
// });
User.hasMany(UserOption, {
  foreignKey: "user_id",
});
// UserOption.belongsTo(User, {
//   foreignKey: "user_id",
//   targetKey: "id",
// });

(async function () {
  await sequelize.sync(/*{ alter: true }*/).then(() => {
    console.log("Sync Users Table success!");
  });
})().catch((err) => {
  console.log("Sync Users Table fail!");
  console.log(err);
});

module.exports = User;
