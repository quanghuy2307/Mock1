const { User } = require("../models/index");
const bcrypt = require("bcrypt");

const userController = {
  getAllUser: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ["id", "full_name", "birthday", "sex", "address", "phone", "email", "role"],
      });

      if (!users.length) {
        return res.status(404).json({ message: "User not found.", data: null });
      } else {
        return res.status(200).json({ message: "Get all question successfully.", data: users });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findOne({
        attributes: ["id", "full_name", "birthday", "sex", "address", "phone", "email", "role"],
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

  updateUserById: async (req, res) => {
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
            role: req.body.role,
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
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  deleteUserById: async (req, res) => {
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
