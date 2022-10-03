const sequelize = require("../configs/db.config");
const User = require("./user.model");
const Result = require("./result.model");
const Question = require("./question.model");
const Option = require("./option.model");
const UserQuestion = require("./user_question.model");
const UserOption = require("./user_option.model");
const Token = require("./token.model");

sequelize
  .sync({ force: true })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
