const express = require("express");
const { authController } = require("../controllers/index");

const authRouter = express.Router();

authRouter.post("/register", authController.registerAccount);
authRouter.post("/login", authController.loginAccount);
authRouter.post("/logout", authController.logoutAccount);
authRouter.post("/forgot", authController.forgotAccount);

module.exports = authRouter;
