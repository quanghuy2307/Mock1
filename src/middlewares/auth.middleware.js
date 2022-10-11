const dotenv = require("../configs/env.config");
const { Token } = require("../models/index");
const jwt = require("jsonwebtoken");

const authMiddleware = {
  verifyAccessToken: async (req, res, next) => {
    try {
      const isAccessTokenValid = await Token.findOne({
        attributes: ["id"],
        where: {
          value: req.headers.access_token,
        },
      });

      if (!isAccessTokenValid) {
        return res.status(401).json({ message: "Invalid refresh token.", data: null });
      }

      jwt.verify(req.headers.access_token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
          return res.status(401).json({ message: "Incorrect access token.", data: null });
        }

        req.user = payload;

        next();
      });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  verifyAdmin: async (req, res, next) => {
    try {
      if (req.user.role === "admin") {
        next();
      } else {
        return res.status(401).json({ message: "Permission denied.", data: null });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  verifyAdminOrBySelf: async (req, res, next) => {
    try {
      if (req.user.role == "admin" || req.user.id == req.params.id) {
        next();
      } else {
        return res.status(401).json({ message: "Permission denied.", data: null });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  verifyRefreshToken: async (req, res, next) => {
    try {
      const isRefreshTokenValid = await Token.findOne({
        attributes: ["id"],
        where: {
          value: req.headers.refresh_token,
        },
      });

      if (!isRefreshTokenValid) {
        return res.status(401).json({ message: "Invalid refresh token.", data: null });
      }

      jwt.verify(req.headers.refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err) {
          return res.status(401).json({ message: "Incorrect refresh token.", data: null });
        }

        req.user = payload;

        next();
      });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },
};

module.exports = authMiddleware;
