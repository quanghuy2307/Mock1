const sequelize = require("../configs/db.config");

const Users = require("./user.model");
const Results = require("./results.model");
const Questions = require("./questions.model");
const Options = require("./options.model");
const UserQuestions = require("./user_questions.model");
const UserOptions = require("./user_options.model");
const TokenRefreshes = require("./token_refreshes.model");
const TokenAccesses = require("./token_accesses.model");

/*  */
Users.hasOne(Results, {
  foreignKey: "userId",
});

/*  */
Questions.hasMany(Options, {
  foreignKey: "questionId",
});

/*  */
Users.hasMany(TokenRefreshes, {
  foreignKey: "userId",
});

/*  */
Users.hasMany(TokenAccesses, {
  foreignKey: "userId",
});

/*  */
TokenRefreshes.hasMany(TokenAccesses, {
  foreignKey: "tokenRefreshId",
});

/*  */
Users.hasMany(UserQuestions, {
  foreignKey: "userId",
});

/*  */
Users.hasMany(UserOptions, {
  foreignKey: "userId",
});

/*  */
Questions.hasMany(UserQuestions, {
  foreignKey: "questionId",
});

/*  */
Questions.hasMany(UserOptions, {
  foreignKey: "questionId",
});

/*  */
Options.hasMany(UserOptions, {
  foreignKey: "optionId",
});

sequelize
  .sync({ force: true })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
