const httpStatus = require("http-status");
const pool = require("../configs/db.config");
const bcrypt = require("bcrypt");

const authController = {
  postRegisterAccount: (req, res, next) => {
    const { fullName, sex, birthday, phoneNumber, address, email, password } = req.body;

    pool.query(`SELECT user_id FROM users WHERE email = $1;`, [email], (error, results) => {
      if (error) {
        throw error.stack;
      }

      if (results.rows.length) {
        res.status(409).json({ message: "Email already exists.", data: {} });
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);

        pool.query(`INSERT INTO users (full_name, birthday, sex, address, phone_number, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`, [fullName, birthday, sex, address, phoneNumber, email, hashedPassword], (error, results) => {
          if (error) {
            throw error.stack;
          }

          res.status(200).json({ message: "Register successfully.", data: { ...results.rows[0] } });
        });
      }
    });
  },

  getRegisterAccount: (req, res, next) => {
    res.render("register");
  },

  // postLoginAccount: (req, res, next) => {

  // },

  getLoginAccount: (req, res, next) => {
    res.render("login");
  },

  // logout: async (req, res, next) => {},

  // postForgotAccount: (req, res, next) => {

  // },

  getForgotAccount: (req, res, next) => {
    res.render("forgot");
  },
};

module.exports = authController;
