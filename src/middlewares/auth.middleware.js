const { dotenv } = require("../configs/index");
const { Token } = require("../models/index");
const jwt = require("jsonwebtoken");
const { responseUtility } = require("../utilities/index");

const authMiddleware = {
  verifyTokens: (tokens) => async (req, res, next) => {
    try {
      if (tokens.includes("refresh_token")) {
        const isRefreshTokenValid = await Token.findOne({
          attributes: ["id"],
          where: {
            value: req.headers.refresh_token,
          },
        });

        if (!isRefreshTokenValid) {
          return responseUtility.response(res, 401, "Invalid refresh token.", null);
        }

        jwt.verify(req.headers.refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
          if (err) {
            return responseUtility.response(res, 401, "Incorrect refresh token.", null);
          }

          req.user = payload;

          next();
        });
      }

      if (tokens.includes("access_token")) {
        const isAccessTokenValid = await Token.findOne({
          attributes: ["id"],
          where: {
            value: req.headers.access_token,
          },
        });

        if (!isAccessTokenValid) {
          return responseUtility.response(res, 401, "Invalid access token.", null);
        }

        jwt.verify(req.headers.access_token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
          if (err) {
            return responseUtility.response(res, 401, "Incorrect access token.", null);
          }

          req.user = payload;

          next();
        });
      }
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  verifyPiorities: (roles) => async (req, res, next) => {
    try {
      if (roles.includes("admin") && !req.user.roles.includes("admin")) {
        return responseUtility.response(res, 401, "You are not admin.", null);
      }

      if (!roles.includes("admin") && roles.includes("user") && req.user.roles.includes("user") && req.user.id != req.params.id) {
        return responseUtility.response(res, 401, "You are not user has this id.", null);
      }

      if (roles.includes("user") && !req.user.roles.includes("user")) {
        return responseUtility.response(res, 401, "You are not user.", null);
      }

      next();
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
    }
  },
};

module.exports = authMiddleware;
