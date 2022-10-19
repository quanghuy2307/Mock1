const authRouter = require("express").Router();
const { authController } = require("../controllers/index");
const { authMiddleware } = require("../middlewares/index");

/**
 * Đăng ký tài khoản user
 */
authRouter.post("/register", authController.registerAccount);

/**
 * Đăng nhập
 */
authRouter.post("/login", authController.loginAccount);

/**
 * Đăng xuất (admin/user)
 */
authRouter.get("/logout/:id", authMiddleware.verifyAccessToken, authMiddleware.verifyAdminOrBySelf, authController.logoutAccount);

/**
 * Lấy access token (user/admin)
 */
authRouter.get("/access_token", authMiddleware.verifyRefreshToken, authController.getAccessToken);

/**
 * Lấy refresh token (user/admin)
 */
authRouter.get("/refresh_token", authMiddleware.verifyAccessToken, authMiddleware.verifyRefreshToken, authController.getRefreshToken);

module.exports = authRouter;
