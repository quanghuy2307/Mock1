const dotenv = require("../configs/env.config");
const { User, Token } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const responseUtility = require("../utilities/response.utility");

/**
 * Tạo token rồi lưu vào DB và cookie
 */
const generateAndStoreToken = async (res, type, payload, secret, expiresIn) => {
  const isTokenExist = await Token.findOne({
    attributes: ["id"],
    where: {
      user_id: parseInt(payload.id),
      type: type,
    },
  });

  if (isTokenExist) {
    await Token.destroy({
      where: {
        user_id: parseInt(payload.id),
        type: type,
      },
    });
  }

  const newToken = await Token.create({
    value: jwt.sign(
      {
        id: parseInt(payload.id),
        role: payload.role,
      },
      secret,
      { expiresIn: expiresIn }
    ),
    user_id: parseInt(payload.id),
    type: type,
    expired_in: expiresIn,
  });

  res.cookie("access_token", newToken.value, {
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "strict",
    maxAge: expiresIn * 1000,
  });
};

const authController = {
  registerAccount: async (req, res) => {
    try {
      const isEmailExist = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (isEmailExist) {
        responseUtility.response(res, 400, "Email already exists.", null);
      } else {
        const { password, ...userInfor } = req.body;

        const newAccount = await User.create({
          ...userInfor,
          hashed_password: bcrypt.hashSync(req.body.password, 10),
        });

        const { hashed_password, data } = newAccount;

        responseUtility.response(res, 200, "Create account successfully.", data);
      }
    } catch (err) {
      responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  loginAccount: async (req, res) => {
    try {
      const account = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!account) {
        responseUtility.response(res, 404, "Email does not exist.", null);
      }

      const isPasswordCorrect = bcrypt.compareSync(req.body.password, account.hashed_password);

      if (!isPasswordCorrect) {
        responseUtility.response(res, 401, "Incorrect password.", null);
      }

      if (account && isPasswordCorrect) {
        generateAndStoreToken(res, "access_token", account, process.env.ACCESS_TOKEN_SECRET, 60);
        generateAndStoreToken(res, "refresh_token", account, process.env.REFRESH_TOKEN_SECRET, 15 * 60);

        const { hashed_password, data } = account;

        responseUtility.response(res, 200, "Logged in successfully.", data);
      }
    } catch (err) {
      responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  logoutAccount: async (req, res) => {
    try {
      await Token.destroy({
        where: {
          user_id: parseInt(req.params.id),
        },
      });

      res.clearCookie("refresh_token");
      res.clearCookie("access_token");

      responseUtility.response(res, 200, "Logged out successfully.", null);
    } catch (err) {
      responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  getAccessToken: async (req, res) => {
    try {
      generateAndStoreToken(res, "access_token", account, process.env.ACCESS_TOKEN_SECRET, 60);

      responseUtility.response(res, 200, "Get access token successfully.", null);
    } catch (err) {
      responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  getRefreshToken: async (req, res) => {
    try {
      generateAndStoreToken(res, "refresh_token", account, process.env.REFRESH_TOKEN_SECRET, 15 * 60);

      responseUtility.response(res, 200, "Get refresh token successfully.", null);
    } catch (err) {
      responseUtility.response(res, 500, "Internal server error.", null);
    }
  },
};

module.exports = authController;
