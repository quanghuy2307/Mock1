const express = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/registerAccount", authController.postRegisterAccount);
authRouter.get("/registerAccount", authController.getRegisterAccount);
// authRouter.post("/loginAccount", authController.postLoginAccount);
authRouter.get("/loginAccount", authController.getLoginAccount);
// authRouter.post("/logout", authController.logout);
authRouter.get("/forgotAccount", authController.getForgotAccount);

module.exports = authRouter;
