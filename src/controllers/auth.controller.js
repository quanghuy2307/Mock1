const httpStatus = require("http-status");
const pool = require("../configs/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const randtoken = require("rand-token");

const authController = {
  registerAccount: (req, res, next) => {
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

  login: (req, res, next) => {
    const { email, password } = req.body;

    pool.query(`SELECT user_id, password FROM users WHERE email = $1;`, [email], (error, results) => {
      if (error) {
        throw error.stack;
      }

      const userID = results.rows[0].user_id;
      const hashedPassword = results.rows[0].password;

      if (!results.rows.length) {
        res.status(409).json({ message: "Email no exists.", data: {} });
      } else {
        const isPasswordCorrect = bcrypt.compareSync(password, hashedPassword);

        if (isPasswordCorrect) {
          const payload = {
            userID,
          };

          const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_LIFE });
          const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFE });
          if (!accessToken) {
            res.status(409).json({ message: "Error login.", data: {} });
          } else {
            res.status(200).json({ message: "Register successfully.", data: {} });
          }
        } else {
          res.status(409).json({ message: "Incorrect password.", data: {} });
        }
      }
    });
  },

  logout: (req, res, next) => {},

  forgotAccount: (req, res, next) => {},
};

module.exports = authController;
