const httpStatus = require("http-status");
const { User } = require("../models/index");
const bcrypt = require("bcrypt");

const userController = {
  getAllUser: async (req, res, next) => {
    try {
      const allUser = await User.findAll({
        attributes: ["id", "full_name", "birthday", "sex", "address", "phone", "email", "role", "updated_at", "created_at"],
      });

      return res.status(200).json({ message: "Successfully.", data: allUser });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const user = await User.findOne({
        attributes: ["id", "full_name", "birthday", "sex", "address", "phone", "email", "role", "updated_at", "created_at"],
        where: {
          id: parseInt(req.params.id),
        },
      });

      return res.status(200).json({ message: "Successfully.", data: user });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  updateUserById: async (req, res, next) => {
    const { full_name, birthday, sex, address, phone, email, password, role } = req.body;

    try {
      await User.update(
        {
          full_name: full_name,
          birthday: birthday,
          sex: sex,
          address: address,
          phone: phone,
          email: email,
          hashed_password: bcrypt.hashSync(password, 10),
          role: role,
        },
        {
          where: {
            id: parseInt(req.params.id),
          },
        }
      );

      return res.status(200).json({ message: "Successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  deleteUserById: async (req, res, next) => {
    try {
      await User.destroy({
        where: {
          id: parseInt(req.params.id),
        },
      });

      return res.status(200).json({ message: "Successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },
};

module.exports = userController;
