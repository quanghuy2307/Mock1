const authRouter = require("express").Router();
const { authController } = require("../controllers/index");
const { authMiddleware } = require("../middlewares/index");
const { upload } = require("../configs/index");

/**
 * Đăng ký tài khoản user
 */
authRouter.post("/register", upload.single("avatar"), authController.registerAccount);

/**
 * Đăng nhập
 */
authRouter.post("/login", authController.loginAccount);

/**
 * Đăng xuất (admin/user)
 */
authRouter.get("/logout/:id", authMiddleware.verifyTokens(["access_token"]), authMiddleware.verifyPiorities("admin", "user"), authController.logoutAccount);

/**
 * Lấy access token (user/admin)
 */
authRouter.get("/access_token", authMiddleware.verifyTokens(["access_token"]), authController.getAccessToken);

/**
 * Lấy refresh token (user/admin)
 */
authRouter.get("/refresh_token", authMiddleware.verifyTokens(["refresh_token", "access_token"]), authController.getRefreshToken);

module.exports = authRouter;
