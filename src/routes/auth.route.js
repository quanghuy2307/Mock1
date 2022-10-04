const authRouter = require("express").Router();
const { authController } = require("../controllers/index");

authRouter.post("/register", authController.registerAccount);
authRouter.post("/login", authController.loginAccount);
authRouter.post("/logout", authController.logoutAccount);
authRouter.post("/forgot", authController.forgotAccount);

module.exports = authRouter;
