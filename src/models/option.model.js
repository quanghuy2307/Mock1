const sequelize = require("../configs/db.config");
const { DataTypes } = require("sequelize");
const UserOption = require("./user_option.model");

const Option = sequelize.define(
  "Option",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    question_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_correct: {
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
    indexes: [
      {
        unique: true,
        fields: ["question_id", "content"],
      },
    ],
    timestamps: false,
  }
);

/*  */
Option.hasMany(UserOption, {
  foreignKey: "option_id",
});

module.exports = Option;
