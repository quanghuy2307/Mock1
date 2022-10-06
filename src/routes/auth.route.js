const authRouter = require("express").Router();
const { authController } = require("../controllers/index");
const { authMiddleware } = require("../middlewares/index");

authRouter.post("/register", authController.registerAccount);
authRouter.post("/login", authController.loginAccount);
authRouter.post("/logout", authMiddleware.verifyAccessToken, authController.logoutAccount);
/**
 * 2 hàm này cần bổ sung id xem thằng nào đòi token
 */
authRouter.post("/access_token", authMiddleware.verifyAccessToken, authController.getAccessToken);
authRouter.post("/refresh_token", authMiddleware.verifyAccessToken, authMiddleware.verifyRefreshToken, authController.getRefreshToken);

module.exports = authRouter;
