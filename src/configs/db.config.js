const dotenv = require("./env.config");
const { Sequelize } = require("sequelize");

/**
 * Most of the methods provided by Sequelize are asynchronous and therefore return Promises.
 * They are all Promises, so you can use the Promise API (then, catch, finally) out of the box.
 * Of course, using async and await works normally as well.
 */

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
});

module.exports = sequelize;
