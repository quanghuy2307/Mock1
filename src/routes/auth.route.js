const express = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", authController.registerAccount);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post("/forgot", authController.forgotAccount);

module.exports = authRouter;
