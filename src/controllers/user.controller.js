const { User } = require("../models/index");
const { Op } = require("sequelize");
const { paginationUtility, responseUtility } = require("../utilities/index");
const bcrypt = require("bcrypt");
const { cloudinary } = require("../configs/index");

const userController = {
  getUsers: async (req, res) => {
    try {
      const { page, size, full_name } = req.query;
      const { limit, offset } = paginationUtility.getPagination(parseInt(page), parseInt(size));

      const data = await User.findAndCountAll({
        attributes: ["id", "full_name", "avatar_link", "birthday", "sex", "address", "phone", "email", "roles", "updated_at", "created_at"],
        where: (condition = full_name ? { full_name: { [Op.like]: `%${full_name}%` } } : null),
        offset: offset,
        limit: limit,
      });

      const response = paginationUtility.getPagingData(data, page, limit);

      if (response.current_items.length) {
        return responseUtility.response(res, 200, "Get user successfully.", response);
      } else {
        return responseUtility.response(res, 404, "User not found.", null);
      }
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  getUser: async (req, res) => {
    try {
      const userInfor = await User.findOne({
        attributes: ["id", "full_name", "avatar_link", "birthday", "sex", "address", "phone", "email", "roles", "updated_at", "created_at"],
        where: {
          id: req.params.id,
        },
      });

      if (!userInfor) {
        return responseUtility.response(res, 404, "User not found.", null);
      } else {
        return responseUtility.response(res, 200, "Get user successfully.", userInfor);
      }
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  updateUser: async (req, res) => {
    try {
      const userID = await User.findByPk(parseInt(req.params.id));

      if (!userID) {
        return responseUtility.response(res, 404, "User not found.", null);
      } else {
        const { password, ...userInfor } = req.body;

        const avatar = await cloudinary.uploader.upload(req.file.path);

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.update(
          {
            ...userInfor,
            avatar_link: avatar.secure_url,
            hashed_password: hashedPassword,
            updated_at: Date.now(),
          },
          {
            where: {
              id: userID,
            },
          }
        );

        const newUserInfor = await User.findOne({
          attributes: ["id", "full_name", "avatar_link", "birthday", "sex", "address", "phone", "email", "roles", "updated_at", "created_at"],
          where: {
            id: req.params.id,
          },
        });

        return responseUtility.response(res, 200, "Update user successfully.", newUserInfor);
      }
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userID = await User.findByPk(parseInt(req.params.id));

      if (!userID) {
        return responseUtility.response(res, 404, "User not found.", null);
      } else {
        await User.destroy({
          where: {
            id: userID,
          },
        });

        return responseUtility.response(res, 200, "Delete user successfully.", null);
      }
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  deleteUsers: async (req, res) => {
    try {
      await User.destroy({
        truncate: true,
      });

      return responseUtility.response(res, 200, "Delete users successfully.", null);
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
    }
  },
};

module.exports = userController;
