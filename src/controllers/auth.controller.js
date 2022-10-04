const httpStatus = require("http-status");
const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const randtoken = require("rand-token");

const authController = {
  registerAccount: async (req, res, next) => {},

  loginAccount: async (req, res, next) => {},

  logoutAccount: async (req, res, next) => {},

  forgotAccount: async (req, res, next) => {},
};

module.exports = authController;
