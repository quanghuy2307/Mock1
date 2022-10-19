const { User } = require("../models/index");
const { Op } = require("sequelize");
const { paginationUtility } = require("../utilities/index");
const bcrypt = require("bcrypt");
const responseUtility = require("../utilities/response.utility");

const userController = {
  getUsers: async (req, res) => {
    try {
      const { page, size, full_name } = req.query;
      const { limit, offset } = paginationUtility.getPagination(parseInt(page), parseInt(size));

      const data = await User.findAndCountAll({
        attributes: ["id", "full_name", "birthday", "sex", "address", "phone", "email", "role", "updated_at", "created_at"],
        where: (condition = full_name ? { full_name: { [Op.like]: `%${full_name}%` } } : null),
        offset: offset,
        limit: limit,
      });

      const response = paginationUtility.getPagingData(data, page, limit);

      if (response.current_items.length) {
        responseUtility.response(res, 200, "Get user successfully.", response);
      } else {
        responseUtility.response(res, 404, "User not found.", null);
      }
    } catch (err) {
      responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  getUser: async (req, res) => {
    try {
      const userInfor = await User.findOne({
        attributes: ["id", "full_name", "birthday", "sex", "address", "phone", "email", "role", "updated_at", "created_at"],
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!userInfor) {
        responseUtility.response(res, 404, "User not found.", null);
      } else {
        responseUtility.response(res, 200, "Get user successfully.", userInfor);
      }
    } catch (err) {
      responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  updateUser: async (req, res) => {
    try {
      const userID = await User.findByPk(parseInt(req.params.id));

      if (!userID) {
        responseUtility.response(res, 404, "User not found.", null);
      } else {
        const { password, ...userInfor } = req.body;

        await User.update(
          {
            ...userInfor,
            hashed_password: bcrypt.hashSync(password, 10),
            updated_at: Date.now(),
          },
          {
            where: {
              id: userID,
            },
          }
        );

        responseUtility.response(res, 200, "Update user successfully.", null);
      }
    } catch (err) {
      responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userID = await User.findByPk(parseInt(req.params.id));

      if (!userID) {
        return res.status(404).json({ message: "User not found.", data: null });
      } else {
        await User.destroy({
          where: {
            id: userID,
          },
        });

        responseUtility.response(res, 200, "Delete user successfully.", null);
      }
    } catch (err) {
      responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  deleteUsers: async (req, res) => {
    try {
      await User.destroy({
        truncate: true,
      });

      responseUtility.response(res, 200, "Delete users successfully.", null);
    } catch (err) {
      responseUtility.response(res, 500, "Internal server error.", null);
    }
  },
};

module.exports = userController;
