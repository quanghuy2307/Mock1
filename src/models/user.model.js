const sequelize = require("../configs/db.config");
const { Sequelize } = require("sequelize");
const { Result, Answer, Token } = require("./index");

/**
 *
 */
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
    avatar_link: {
      type: Sequelize.TEXT,
      defaultValue: "",
      allowNull: false,
    },
    birthday: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    sex: {
      type: Sequelize.ENUM("male", "female", "others"),
      defaultValue: "others",
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(50),
      unique: true,
      allowNull: false,
    },
    hashed_password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    roles: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: ["user"],
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

/**
 *
 */
User.hasOne(Token, {
  foreignKey: "user_id",
});
Token.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
});

/**
 *
 */
User.hasMany(Result, {
  foreignKey: "user_id",
});
Result.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
});

/**
 *
 */
User.hasMany(Answer, {
  foreignKey: "user_id",
});
Answer.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
});

module.exports = User;
