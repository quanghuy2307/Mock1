const httpStatus = require("http-status");
const pool = require("../configs/db.config");
const bcrypt = require("bcrypt");

const userController = {
  getAllUser: (req, res, next) => {
    pool.query(`SELECT * FROM users;`, [], (error, results) => {
      if (error) {
        throw error.stack;
      }

      res.status(200).json({ message: "Get successfully.", data: results.rows });
    });
  },

  getUserById: (req, res, next) => {
    pool.query(`SELECT * FROM users WHERE user_id = $1;`, [req.params.userID], (error, results) => {
      if (error) {
        throw error.stack;
      }

      res.status(200).json({ message: "Get successfully.", data: results.rows[0] });
    });
  },

  updateUser: (req, res, next) => {
    const { fullName, sex, birthday, phoneNumber, address, email, password } = req.body;

    pool.query(`UPDATE TABLE users SET full_name = $1, sex = $2, birthday = $3, phone_number = $4, address = $5, email = $6, password = $7 WHERE user_id = $8 RETURNING *;`, [fullName, sex, birthday, phoneNumber, address, email, password, req.params.userID], (error, results) => {
      if (error) {
        throw error.stack;
      }

      res.status(200).json({ message: "Update successfully.", data: results.rows[0] });
    });
  },

  deleteUser: (req, res, next) => {
    pool.query(`DELETE FROM users WHERE user_id = $1;`, [req.params.userID], (error, results) => {
      if (error) {
        throw error.stack;
      }

      res.status(200).json({ message: "Delete successfully.", data: {} });
    });
  },
};

module.exports = userController;
