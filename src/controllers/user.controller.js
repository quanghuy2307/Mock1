const httpStatus = require("http-status");
const { User } = require("../models/index");
const bcrypt = require("bcrypt");

const userController = {
  getAllUser: async (req, res, next) => {
    const allUser = await User.findAll({
      attributes: ["id", "full_name", "birthday", "sex", "address", "phone", "email", "role", "updated_at", "created_at"],
    });

    return res.status(200).json({ message: "Successfully.", data: allUser });
  },

  getUserById: async (req, res, next) => {
    const user = await User.findOne({
      attributes: ["id", "full_name", "birthday", "sex", "address", "phone", "email", "role", "updated_at", "created_at"],
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({ message: "Successfully.", data: user });
  },

  updateUserById: async (req, res, next) => {
    const { fullName, birthday, sex, address, phone, email, password, role } = req.body;

    hashedPassword = bcrypt.hashSync(password, 10);

    await User.update(
      {
        full_name: fullName,
        birthday: birthday,
        sex: sex,
        address: address,
        phone: phone,
        email: email,
        hashed_password: hashedPassword,
        role: role,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.status(200).json({ message: "Successfully.", data: null });
  },

  deleteUserById: async (req, res, next) => {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({ message: "Successfully.", data: null });
  },
};

module.exports = userController;
