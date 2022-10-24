const { User, Token } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const responseUtility = require("../utilities/index");
const { dotenv, cloudinary } = require("../configs/index");

/**
 * Tạo token rồi lưu vào DB và cookie
 */
const generateAndStoreToken = async (res, type, payload, secret, expiresIn) => {
  const isTokenExist = await Token.findOne({
    attributes: ["id"],
    where: {
      user_id: payload.id,
      type: type,
    },
  });

  if (isTokenExist) {
    await Token.destroy({
      where: {
        user_id: payload.id,
        type: type,
      },
    });
  }

  const newToken = await Token.create({
    value: jwt.sign(
      {
        id: payload.id,
        roles: payload.roles,
      },
      secret,
      { expiresIn: expiresIn }
    ),
    user_id: payload.id,
    type: type,
    expired_in: expiresIn,
  });

  res.cookie(type, newToken.value, {
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "strict",
    maxAge: expiresIn,
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
        return responseUtility.response(res, 400, "Email already exists.", null);
      } else {
        const { password, ...userInfor } = req.body;

        const avatar = await cloudinary.uploader.upload(req.file.path);

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAccount = await User.create({
          ...userInfor,
          avatar_link: avatar.secure_url,
          hashed_password: hashedPassword,
        });

        return responseUtility.response(res, 200, "Create account successfully.", {
          id: newAccount.id,
          full_name: newAccount.full_name,
          avatar_link: newAccount.avatar_link,
          birthday: newAccount.birthday,
          sex: newAccount.sex,
          address: newAccount.address,
          phone: newAccount.phone,
          email: newAccount.email,
          roles: newAccount.roles,
          updated_at: newAccount.updated_at,
          created_at: newAccount.created_at,
        });
      }
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
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
        return responseUtility.response(res, 404, "Email does not exist.", null);
      }

      const isPasswordCorrect = await bcrypt.compare(req.body.password, account.hashed_password);
      if (!isPasswordCorrect) {
        return responseUtility.response(res, 401, "Incorrect password.", null);
      }

      if (account && isPasswordCorrect) {
        await generateAndStoreToken(res, "access_token", account, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_TIMELIFE);
        await generateAndStoreToken(res, "refresh_token", account, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_TIMELIFE);

        return responseUtility.response(res, 200, "Logged in successfully.", {
          id: account.id,
          full_name: account.full_name,
          avatar_link: account.avatar_link,
          birthday: account.birthday,
          sex: account.sex,
          address: account.address,
          phone: account.phone,
          email: account.email,
          roles: account.roles,
          updated_at: account.updated_at,
          created_at: account.created_at,
        });
      }
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  logoutAccount: async (req, res) => {
    try {
      const token = await Token.findOne({
        where: {
          user_id: req.params.id,
        },
      });

      if (!token) {
        return responseUtility.response(res, 404, "User is not logged in.", null);
      } else {
        await Token.destroy({
          where: {
            user_id: req.params.id,
          },
        });

        res.clearCookie("refresh_token");
        res.clearCookie("access_token");

        return responseUtility.response(res, 200, "Logged out successfully.", null);
      }
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  getAccessToken: async (req, res) => {
    try {
      await generateAndStoreToken(res, "access_token", req.user, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_TIMELIFE);

      return responseUtility.response(res, 200, "Get access token successfully.", process.env.ACCESS_TOKEN_TIMELIFE);
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  getRefreshToken: async (req, res) => {
    try {
      await generateAndStoreToken(res, "refresh_token", req.user, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_TIMELIFE);

      return responseUtility.response(res, 200, "Get refresh token successfully.", process.env.REFRESH_TOKEN_TIMELIFE);
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
    }
  },
};

module.exports = authController;
