const dotenv = require("../configs/env.config");
const httpStatus = require("http-status");
const { RefreshToken } = require("../models/index");
const jwt = require("jsonwebtoken");

const authMiddleware = {
  verifyAccessToken: async (req, res, next) => {
    try {
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

  verifyAccessTokenAndAdmin: async (req, res, next) => {
    try {
      jwt.verify(req.headers.access_token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
          return res.status(401).json({ message: "Incorrect access token.", data: null });
        }

        if (payload.role === "admin") {
          next();
        } else {
          return res.status(401).json({ message: "You're not admin.", data: null });
        }
      });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  verifyAccessTokenAndAdminOrBySelf: async (req, res, next) => {
    try {
      jwt.verify(req.headers.access_token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
          return res.status(401).json({ message: "Incorrect access token.", data: null });
        }

        if (payload.role == "admin" || payload.id == req.params.id) {
          next();
        } else {
          return res.status(401).json({ message: "Permission denied.", data: null });
        }
      });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  verifyRefreshToken: async (req, res, next) => {
    try {
      const val = RefreshToken.findOne({
        where: {
          content: req.headers.refresh_token,
        },
      });

      if (!val) {
        return reject(res.status(401).json({ message: "Invalid refresh token.", data: null }));
      }

      jwt.verify(req.headers.refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, token) => {
        if (err) {
          return reject(res.status(401).json({ message: "Incorrect refresh token.", data: null }));
        }

        next();
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },
};

module.exports = authMiddleware;
