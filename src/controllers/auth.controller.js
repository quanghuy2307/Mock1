const dotenv = require("../configs/env.config");
const { User, Token } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 *
 */
const generateAndStoreToken = async (type, payload, secret, expiresIn) => {
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

  return newToken.value;
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
        return res.status(400).json({ message: "Email already exists.", data: null });
      } else {
        const newAccount = await User.create({
          full_name: req.body.full_name,
          birthday: req.body.birthday,
          sex: req.body.sex,
          address: req.body.address,
          phone: req.body.phone,
          email: req.body.email,
          hashed_password: bcrypt.hashSync(req.body.password, 10),
        });

        return res.status(200).json({ message: "Create account successfully.", data: { user_id: newAccount.id } });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
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
        return res.status(401).json({ message: "Email does not exist.", data: null });
      }

      const isPasswordCorrect = bcrypt.compareSync(req.body.password, account.hashed_password);

      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Incorrect password.", data: null });
      }

      if (account && isPasswordCorrect) {
        res.cookie("access_token", await generateAndStoreToken("access_token", account, process.env.ACCESS_TOKEN_SECRET, 60 * 1000), {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
          maxAge: 60 * 1000,
        });

        res.cookie("refresh_token", await generateAndStoreToken("refresh_token", account, process.env.REFRESH_TOKEN_SECRET, 15 * 60 * 1000), {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        });

        return res.status(200).json({ message: "Logged in successfully.", data: { user_id: account.id } });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
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

      return res.status(200).json({ message: "Logged out successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  getAccessToken: async (req, res) => {
    try {
      res.cookie("access_token", await generateAndStoreToken("access_token", req.user, process.env.ACCESS_TOKEN_SECRET, 60 * 1000), {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
        maxAge: 60 * 1000,
      });

      return res.status(200).json({ message: "Get access token successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  getRefreshToken: async (req, res) => {
    try {
      res.cookie("refresh_token", await generateAndStoreToken("refresh_token", req.user, process.env.REFRESH_TOKEN_SECRET, 15 * 60 * 1000), {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });

      return res.status(200).json({ message: "Get refresh token successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },
};

module.exports = authController;
