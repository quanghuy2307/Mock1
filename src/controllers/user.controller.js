const { User } = require("../models/index");
const { Op } = require("sequelize");
const { paginationUtility } = require("../utilities/index");
const bcrypt = require("bcrypt");

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
        return res.status(200).json({ message: "Get user successfully.", data: response });
      } else {
        return res.status(404).json({ message: "User not found.", data: null });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findOne({
        attributes: ["id", "full_name", "birthday", "sex", "address", "phone", "email", "role", "updated_at", "created_at"],
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found.", data: null });
      } else {
        return res.status(200).json({ message: "Get user successfully.", data: user });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findOne({
        attributes: ["id"],
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found.", data: null });
      } else {
        await User.update(
          {
            full_name: req.body.full_name,
            birthday: req.body.birthday,
            sex: req.body.sex,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            hashed_password: bcrypt.hashSync(req.body.password, 10),
            updated_at: Date.now(),
          },
          {
            where: {
              id: parseInt(req.params.id),
            },
          }
        );

        return res.status(200).json({ message: "Update user successfully.", data: null });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findOne({
        attributes: ["id"],
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found.", data: null });
      } else {
        await User.destroy({
          where: {
            id: parseInt(req.params.id),
          },
        });

        return res.status(200).json({ message: "Delete user successfully.", data: null });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },
};

module.exports = userController;
