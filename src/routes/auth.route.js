const authRouter = require("express").Router();
const { authController } = require("../controllers/index");
const { authMiddleware } = require("../middlewares/index");

authRouter.post("/register", authController.registerAccount);
authRouter.post("/login", authController.loginAccount);
authRouter.post("/logout", authMiddleware.verifyAccessToken, authController.logoutAccount);

module.exports = authRouter;
