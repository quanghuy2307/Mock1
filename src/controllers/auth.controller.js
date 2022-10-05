const dotenv = require("../configs/env.config");
const httpStatus = require("http-status");
const { User, RefreshToken, Result } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (user, secret, expiresIn) => {
  return jwt.sign(
    {
      id: parseInt(user.id),
      role: user.role,
    },
    secret,
    { expiresIn: expiresIn }
  );
};

const authController = {
  registerAccount: async (req, res, next) => {
    try {
      const isEmailExist = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (isEmailExist) {
        return res.status(500).json({ message: "Email already exists.", data: null });
      }

      const newAccount = await User.create({
        full_name: req.body.full_name,
        birthday: req.body.birthday,
        sex: req.body.sex,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        hashed_password: bcrypt.hashSync(req.body.password, 10),
      });

      await RefreshToken.create({
        user_id: parseInt(newAccount.id),
      });

      await Result.create({
        user_id: parseInt(newAccount.id),
      });

      return res.status(200).json({ message: "Create account successfully.", data: { id: newAccount.id } });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: {} });
    }
  },

  loginAccount: async (req, res, next) => {
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
        const accessToken = generateToken(account, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRED);
        const refreshToken = generateToken(account, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRED);

        await RefreshToken.update(
          {
            content: refreshToken,
            expired_in: process.env.REFRESH_TOKEN_EXPIRED,
          },
          {
            where: {
              id: parseInt(account.id),
            },
          }
        );

        res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });

        return res.status(200).json({ message: "Logged in successfully.", data: { access_token: accessToken, refresh_token: refreshToken } });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  logoutAccount: async (req, res, next) => {
    try {
      await RefreshToken.update(
        {
          content: "",
          expired_in: "",
        },
        {
          where: {
            id: parseInt(req.body.id),
          },
        }
      );

      res.clearCookie("refresh_token");

      return res.status(200).json({ message: "Logged out successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },
};

module.exports = authController;
